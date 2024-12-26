"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuple = exports.getTupleElements = void 0;
const utils_1 = require("@metamask/utils");
const errors_1 = require("../errors");
const packer_1 = require("../packer");
const TUPLE_REGEX = /^\((.+)\)$/u;
const isTupleType = (type) => TUPLE_REGEX.test(type);
/**
 * Get elements from a tuple type.
 *
 * @param type - The tuple type to get the types for.
 * @returns The elements of the tuple as string array.
 */
const getTupleElements = (type) => {
    (0, utils_1.assert)(type.startsWith('(') && type.endsWith(')'), new errors_1.ParserError(`Invalid tuple type. Expected tuple type, but received "${type}".`));
    const elements = [];
    let current = '';
    let depth = 0;
    for (let i = 1; i < type.length - 1; i++) {
        const char = type[i];
        if (char === ',' && depth === 0) {
            elements.push(current.trim());
            current = '';
        }
        else {
            current += char;
            if (char === '(') {
                depth += 1;
            }
            else if (char === ')') {
                depth -= 1;
            }
        }
    }
    if (current.trim()) {
        elements.push(current.trim());
    }
    return elements;
};
exports.getTupleElements = getTupleElements;
exports.tuple = {
    /**
     * Check if the tuple is dynamic. Tuples are dynamic if one or more elements
     * of the tuple are dynamic.
     *
     * @param type - The type to check.
     * @returns Whether the tuple is dynamic.
     */
    isDynamic(type) {
        const elements = (0, exports.getTupleElements)(type);
        return elements.some((element) => {
            const parser = (0, packer_1.getParser)(element);
            return (0, packer_1.isDynamicParser)(parser, element);
        });
    },
    /**
     * Check if a type is a tuple type.
     *
     * @param type - The type to check.
     * @returns Whether the type is a tuple type.
     */
    isType(type) {
        return isTupleType(type);
    },
    /**
     * Get the byte length of a tuple type. If the tuple is dynamic, this will
     * always return 32. If the tuple is static, this will return the sum of the
     * byte lengths of the tuple elements.
     *
     * @param type - The type to get the byte length for.
     * @returns The byte length of the tuple type.
     */
    getByteLength(type) {
        if ((0, packer_1.isDynamicParser)(this, type)) {
            return 32;
        }
        const elements = (0, exports.getTupleElements)(type);
        return elements.reduce((total, element) => {
            return total + (0, packer_1.getParser)(element).getByteLength(element);
        }, 0);
    },
    /**
     * Encode a tuple value.
     *
     * @param args - The encoding arguments.
     * @param args.type - The type of the value.
     * @param args.buffer - The byte array to add to.
     * @param args.value - The value to encode.
     * @param args.packed - Whether to use non-standard packed encoding.
     * @param args.tight - Whether to use non-standard tight encoding.
     * @returns The bytes with the encoded value added to it.
     */
    encode({ type, buffer, value, packed, tight }) {
        const elements = (0, exports.getTupleElements)(type);
        return (0, packer_1.pack)({
            types: elements,
            values: value,
            byteArray: buffer,
            packed,
            tight,
        });
    },
    /**
     * Decode a tuple value.
     *
     * @param args - The decoding arguments.
     * @param args.type - The type of the value.
     * @param args.value - The value to decode.
     * @param args.skip - A function to skip a number of bytes.
     * @returns The decoded value.
     */
    decode({ type, value, skip }) {
        const elements = (0, exports.getTupleElements)(type);
        const length = this.getByteLength(type) - 32;
        skip(length);
        return (0, packer_1.unpack)(elements, value);
    },
};
//# sourceMappingURL=tuple.js.map