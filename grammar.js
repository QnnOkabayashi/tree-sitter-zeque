/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'zeque',

  extras: $ => [
      /\s/,
      $.line_comment,
  ],

  word: $ => $.name,

  rules: {
    source_file: $ => repeat($.decl),
    decl: $ => choice($.fn_decl, $.field_decl),
    fn_decl: $ => seq(
        optional('pub'),
        'fn',
        field('name', $.name),
        '(',
        seq(
            repeat(seq($.param, ',')),
            optional($.param),
        ),
        ')',
        $.expr,
        $.block,
    ),
    field_decl: $ => seq($.name, ':', $.expr, ','),
    param: $ => seq(
        optional('comptime'),
        field('name', $.name),
        ':',
        $.expr,
    ),
    block: $ => seq('{', seq(repeat($.stmt), optional($.expr)), '}'),
    stmt: $ => choice($.let_),
    let_: $ => seq(
        'let',
        field('name', $.name),
        optional(seq(':', $.expr)),
        '=',
        $.expr,
        ';',
    ), 
    arg_list: $ => seq(
        '(', 
        seq(
            repeat(seq($.expr, ',')),
            optional($.expr),
        ),
        ')',
    ),
    call: $ => seq(
        $.expr,
        $.arg_list,
    ),
    builtin_function: $ => seq(
        '@',
        $.name,
    ),
    builtin_call: $ => seq(
        field('builtin_function', $.builtin_function),
        $.arg_list,
    ),
    raw_string_part: $ => seq('\\\\', token.immediate(/[^\n]*/)),
    raw_string: $ => repeat1($.raw_string_part),
    expr: $ => choice(
        seq('if', $.expr, '{', $.expr, '}', 'else', '{', $.expr, '}'),
        prec.left(4, seq($.expr, '*', $.expr)),
        prec.left(3, seq($.expr, '+', $.expr)),
        prec.left(3, seq($.expr, '-', $.expr)),
        prec.left(2, seq($.expr, '==', $.expr)),
        $.call,
        $.builtin_call,
        prec(1, seq('comptime', $.expr)),
        $.integer_literal,
        $.boolean_literal,
        $.raw_string,
        seq('struct', '{', repeat($.decl), '}'),
        seq($.expr, $.constructor_block),
        field('name', $.name),
        seq($.expr, '.', $.name),
        $.block,
    ),
    name: $ => /[_a-zA-Z][_a-zA-Z0-9]*/,
    integer_literal: $ => /[0-9]+/,
    boolean_literal: $ => choice('true', 'false'),

    constructor_block: $ => seq(
        '{',
        seq(
            repeat(seq($.constructor_field, ',')),
            optional($.constructor_field),
        ),
        '}',
    ),
    constructor_field: $ => seq($.name, ':', $.expr),
    line_comment: $ => seq('//', token.immediate(/[^\n]*/)),
  }
});
