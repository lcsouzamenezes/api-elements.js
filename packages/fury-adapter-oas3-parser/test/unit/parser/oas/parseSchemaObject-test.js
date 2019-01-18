const { Fury } = require('fury');
const { expect } = require('../../chai');
const parse = require('../../../../lib/parser/oas/parseSchemaObject');
const Context = require('../../../../lib/context');

const { minim: namespace } = new Fury();

describe('Schema Object', () => {
  let context;
  beforeEach(() => {
    context = new Context(namespace);
  });

  it('provides a warning when schema is non-object', () => {
    const schema = new namespace.elements.String('my schema');
    const result = parse(context, schema);

    expect(result.length).to.equal(1);
    expect(result).to.contain.warning("'Schema Object' is not an object");
  });

  describe('#type', () => {
    it('warns when type is not a string', () => {
      const schema = new namespace.elements.Object({
        type: ['null'],
      });
      const result = parse(context, schema);

      expect(result).to.contain.warning("'Schema Object' 'type' is not a string");
    });

    it('warns when type is not a valid type', () => {
      const schema = new namespace.elements.Object({
        type: 'invalid',
      });
      const result = parse(context, schema);

      expect(result).to.contain.warning(
        "'Schema Object' 'type' must be either null, boolean, object, array, number, string, integer"
      );
    });

    it('returns a null structure for null type', () => {
      const schema = new namespace.elements.Object({
        type: 'null',
      });
      const result = parse(context, schema);

      expect(result.length).to.equal(1);
      expect(result.get(0)).to.be.instanceof(namespace.elements.DataStructure);
      expect(result).to.not.contain.annotations;

      const element = result.get(0).content;
      expect(element).to.be.instanceof(namespace.elements.Null);
    });

    it('returns a boolean structure for boolean type', () => {
      const schema = new namespace.elements.Object({
        type: 'boolean',
      });
      const result = parse(context, schema);

      expect(result.length).to.equal(1);
      expect(result.get(0)).to.be.instanceof(namespace.elements.DataStructure);
      expect(result).to.not.contain.annotations;

      const string = result.get(0).content;
      expect(string).to.be.instanceof(namespace.elements.Boolean);
    });

    it('returns an object structure for object type', () => {
      const schema = new namespace.elements.Object({
        type: 'object',
      });
      const result = parse(context, schema);

      expect(result.length).to.equal(1);
      expect(result.get(0)).to.be.instanceof(namespace.elements.DataStructure);
      expect(result).to.not.contain.annotations;

      const object = result.get(0).content;
      expect(object).to.be.instanceof(namespace.elements.Object);
    });

    it('returns an array structure for array type', () => {
      const schema = new namespace.elements.Object({
        type: 'array',
      });
      const result = parse(context, schema);

      expect(result.length).to.equal(1);
      expect(result.get(0)).to.be.instanceof(namespace.elements.DataStructure);
      expect(result).to.not.contain.annotations;

      const array = result.get(0).content;
      expect(array).to.be.instanceof(namespace.elements.Array);
    });

    it('returns a number structure for number type', () => {
      const schema = new namespace.elements.Object({
        type: 'number',
      });
      const result = parse(context, schema);

      expect(result.length).to.equal(1);
      expect(result.get(0)).to.be.instanceof(namespace.elements.DataStructure);
      expect(result).to.not.contain.annotations;

      const string = result.get(0).content;
      expect(string).to.be.instanceof(namespace.elements.Number);
    });

    it('returns a string structure for string type', () => {
      const schema = new namespace.elements.Object({
        type: 'string',
      });
      const result = parse(context, schema);

      expect(result.length).to.equal(1);
      expect(result.get(0)).to.be.instanceof(namespace.elements.DataStructure);
      expect(result).to.not.contain.annotations;

      const string = result.get(0).content;
      expect(string).to.be.instanceof(namespace.elements.String);
    });

    it('returns a number structure for integer type', () => {
      const schema = new namespace.elements.Object({
        type: 'integer',
      });
      const result = parse(context, schema);

      expect(result.length).to.equal(1);
      expect(result.get(0)).to.be.instanceof(namespace.elements.DataStructure);
      expect(result).to.not.contain.annotations;

      const string = result.get(0).content;
      expect(string).to.be.instanceof(namespace.elements.Number);
    });
  });
});