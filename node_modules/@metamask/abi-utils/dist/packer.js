"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpack = exports.pack = exports.isDynamicParser = exports.getParser = void 0;
const utils_1 = require("@metamask/utils");
const errors_1 = require("./errors");
const iterator_1 = require("./iterator");
const parsers_1 = require("./parsers");
const utils_2 = require("./utils");
/**
 * Get the parser for the specified type.
 *
 * @param type - The type to get a parser for.
 * @returns The parser.
 * @throws If there is no parser for the specified type.
 */
const getParser = (type) => {
    const parsers = {
        address: parsers_1.address,
        array: parsers_1.array,
        bool: parsers_1.bool,
        bytes: parsers_1.bytes,
        fixedBytes: parsers_1.fixedBytes,
        function: parsers_1.fn,
        number: parsers_1.number,
        string: parsers_1.string,
        tuple: parsers_1.tuple,
    };
    const staticParser = parsers[type];
    if (staticParser) {
        return staticParser;
    }
    const parser = Object.values(parsers).find((value) => value.isType(type));
    if (parser) {
        return parser;
    }
    throw new errors_1.ParserError(`The type "${type}" is not supported.`);
};
exports.getParser = getParser;
/**
 * Check if the specified parser is dynamic, for the provided types. This is
 * primarily used for parsing tuples, where a tuple can be dynamic based on the
 * types. For other parsers, it will simply use the set `isDynamic` value.
 *
 * @param parser - The parser to check.
 * @param type - The type to check the parser with.
 * @returns Whether the parser is dynamic.
 */
const isDynamicParser = (parser, type) => {
    const { isDynamic } = parser;
    if (typeof isDynamic === 'function') {
        return isDynamic(type);
    }
    return isDynamic;
};
exports.isDynamicParser = isDynamicParser;
/**
 * Pack the provided values in a buffer, encoded with the specified types. If a
 * buffer is specified, the resulting value will be concatenated with the
 * buffer.
 *
 * @param args - The arguments object.
 * @param args.types - The types of the values to pack.
 * @param args.values - The values to pack.
 * @param args.packed - Whether to use the non-standard packed mode. Defaults to
 * `false`.
 * @param args.arrayPacked - Whether to use the non-standard packed mode for
 * arrays. Defaults to `false`.
 * @param args.byteArray - The byte array to encode the values into. Defaults to
 * an empty array.
 * @param args.tight - Whether to use tight packing mode. Only applicable when
 * `packed` is true. When true, the packed mode will not add any padding bytes.
 * This matches the packing behaviour of `ethereumjs-abi`, but is not standard.
 * @returns The resulting encoded buffer.
 */
const pack = ({ types, values, packed = false, tight = false, arrayPacked = false, byteArray = new Uint8Array(), }) => {
    (0, utils_1.assert)(types.length === values.length, new errors_1.ParserError(`The number of types (${types.length}) does not match the number of values (${values.length}).`));
    const { staticBuffer, dynamicBuffer, pointers } = types.reduce(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ staticBuffer, dynamicBuffer, pointers }, type, index) => {
        const parser = (0, exports.getParser)(type);
        const value = values[index];
        // If packed mode is enabled, we can skip the dynamic check, as all
        // values are encoded in the static buffer.
        if (packed || arrayPacked || !(0, exports.isDynamicParser)(parser, type)) {
            return {
                staticBuffer: parser.encode({
                    buffer: staticBuffer,
                    value,
                    type,
                    packed,
                    tight,
                }),
                dynamicBuffer,
                pointers,
            };
        }
        const newStaticBuffer = (0, utils_1.concatBytes)([staticBuffer, new Uint8Array(32)]);
        const newDynamicBuffer = parser.encode({
            buffer: dynamicBuffer,
            value,
            type,
            packed,
            tight,
        });
        return {
            staticBuffer: newStaticBuffer,
            dynamicBuffer: newDynamicBuffer,
            pointers: [
                ...pointers,
                { position: staticBuffer.length, pointer: dynamicBuffer.length },
            ],
        };
    }, {
        staticBuffer: new Uint8Array(),
        dynamicBuffer: new Uint8Array(),
        pointers: [],
    });
    // If packed mode is enabled, there shouldn't be any dynamic values.
    (0, utils_1.assert)((!packed && !arrayPacked) || dynamicBuffer.length === 0, new errors_1.ParserError('Invalid pack state.'));
    const dynamicStart = staticBuffer.length;
    const updatedBuffer = pointers.reduce((target, { pointer, position }) => {
        const offset = (0, utils_2.padStart)((0, utils_1.numberToBytes)(dynamicStart + pointer));
        return (0, utils_2.set)(target, offset, position);
    }, staticBuffer);
    return (0, utils_1.concatBytes)([byteArray, updatedBuffer, dynamicBuffer]);
};
exports.pack = pack;
const unpack = (types, buffer) => {
    const iterator = (0, iterator_1.iterate)(buffer);
    return types.map((type) => {
        const { value: { value, skip }, done, } = iterator.next();
        (0, utils_1.assert)(!done, new errors_1.ParserError(`The encoded value is invalid for the provided types. Reached end of buffer while attempting to parse "${type}".`));
        const parser = (0, exports.getParser)(type);
        const isDynamic = (0, exports.isDynamicParser)(parser, type);
        if (isDynamic) {
            const pointer = (0, utils_1.bytesToNumber)(value.subarray(0, 32));
            const target = buffer.subarray(pointer);
            return parser.decode({ type, value: target, skip });
        }
        return parser.decode({ type, value, skip });
    });
};
exports.unpack = unpack;
//# sourceMappingURL=packer.js.map