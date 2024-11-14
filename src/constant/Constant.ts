export const OPERATOR_REGEX = /[+\-*/]$/;
export const OPERATOR_KEYS = ['+', '-', '*', '/', '√', '%'];
export const OPERATORS_KEYS = ['+', '-', '*', '/'];
export const REGEX_SQRT = /√(\d+)/g;
export const REGEX_PERCENT = /(\d+)%/g;
export const SANITIZE_EXPR = /[^-()\d/*+.Math.sqrt]/g;
export const BUTTONS = [
  'MS', 'MR', 'MC', '/', '7', '8', '9', '*', '4', '5', '6', '-',
  '1', '2', '3', '+', '0', '.', '=', '%', 'DEL', 'CLEAR', '√'
];
