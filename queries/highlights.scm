"fn" @keyword
"struct" @keyword
"pub" @keyword
"let" @keyword
"const" @keyword
"if" @keyword
"else" @keyword

((name) @variable.builtin
  (#any-of? @variable.builtin "Self" "i32" "bool" "type" "Linear")
  (#has-parent? @variable.builtin expr))

"true" @constant.builtin
"false" @constant.builtin

["*" "+" "-" "=" "=="] @operator

(line_comment) @comment
(integer_literal) @number
["{" "}" "(" ")"] @punctuation.bracket
["." ":"] @punctuation.delimiter
(fn_decl
  name: (name) @function)
(builtin_call
  builtin_function: (builtin_function) @function.builtin)
(param
  name: (name) @variable.parameter)
(raw_string_part) @string
