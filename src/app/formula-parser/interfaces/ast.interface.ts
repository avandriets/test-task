export type AstNodeTypes = 'PAREN' | 'NUMBER' | 'ADDITION' | 'SUBTRACTION' | 'DIVISION'
  | 'MULTIPLICATION' | 'FUNCTION' | 'POWER' | 'NEGATION' | 'PI' | 'E' | 'VARIABLE';

export type DFS = (a: any) => string;

export const MathOp: { [key: string]: string } = {
  'ADDITION': '+',
  'SUBTRACTION': '-',
  'DIVISION': '/',
  'MULTIPLICATION': '*',
  'PI': 'PI',
  'E': 'E',
};

export type AstNode = AstNumber & AstExpression & AstGroup & AstFunction & AstPower;

export interface AstGroup {
  type?: AstNodeTypes;
  expression?: AstGroup | AstNumber | AstExpression | AstFunction | AstPower;
}

export interface AstExpression {
  type?: AstNodeTypes;
  left?: AstNode;
  right?: AstNode;
}

export interface AstNumber {
  type: AstNodeTypes;
  value: number;
}

export interface AstFunction {
  type?: AstNodeTypes;
  name?: string;
  arguments?: AstNode[];
}

export interface AstPower {
  type?: AstNodeTypes;
  expression?: AstExpression;
  power?: AstNode;
}
