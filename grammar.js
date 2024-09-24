/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'Zeque',

  rules: {
    source_file: $ => repeat($.decl),
    decl: $ => choice($.fn_decl, $.field_decl),
    fn_decl: $ => seq(
        optional('pub'),
        'fn',
        $.name,
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
    param: $ => seq(optional('comptime'), $.name, ':', $.expr),
    block: $ => seq('{', seq(repeat($.stmt), optional($.expr)), '}'),
    stmt: $ => choice($.let_),
    let_: $ => seq('let', $.name, optional(seq(':', $.expr)), '=', $.expr, ';'), 
    arg_list: $ => seq(
        '(', 
        seq(
            repeat(seq($.expr, ',')),
            optional($.expr),
        ),
        ')',
    ),
    expr: $ => choice(
        seq('if', $.expr, '{', $.expr, '}', 'else', '{', $.expr, '}'),
        prec.left(4, seq($.expr, '*', $.expr)),
        prec.left(3, seq($.expr, '+', $.expr)),
        prec.left(3, seq($.expr, '-', $.expr)),
        prec.left(2, seq($.expr, '==', $.expr)),
        seq($.expr, $.arg_list),
        seq('@', $.name, $.arg_list),
        prec(1, seq('comptime', $.expr)),
        $.integer,
        $.bool,
        seq('struct', '{', repeat($.decl), '}'),
        seq($.expr, $.constructor_block),
        $.name,
        seq($.expr, '.', $.name),
        $.block,
    ),
    name: $ => /[_a-zA-Z][_a-zA-Z0-9]*/,
    integer: $ => /[0-9]+/,
    bool: $ => choice('true', 'false'),

    constructor_block: $ => seq(
        '{',
        seq(
            repeat(seq($.constructor_field, ',')),
            optional($.constructor_field),
        ),
        '}',
    ),
    constructor_field: $ => seq($.name, ':', $.expr),
  }
});
