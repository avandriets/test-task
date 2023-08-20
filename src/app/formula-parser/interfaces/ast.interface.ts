export type DFSFunc = (node: AstNode) => string;

export const MathOp: { [key: string]: string } = {
  'ADDITION': '+',
  'SUBTRACTION': '-',
  'DIVISION': '/',
  'MULTIPLICATION': '*',
  'PI': 'PI',
  'E': 'E',
};

export type AstNode = { type: unknown; }
  & (AstNumber | AstExpression | AstGroup | AstFunction | AstPower | AstNegation | AstVariable | AstPI | AstE);

export interface AstPI {
  type: 'PI';
  value: number;
}

export interface AstE {
  type: 'E';
  value: number;
}

export interface AstNumber {
  type: 'NUMBER';
  value: number;
}

export interface AstVariable {
  type: 'VARIABLE';
  name: string;
}

export interface AstGroup {
  type: 'PAREN';
  expression: AstExpression;
}

export interface AstNegation {
  type: 'NEGATION';
  expression: AstExpression;
}

export interface AstExpression {
  type: 'ADDITION' | 'SUBTRACTION' | 'DIVISION' | 'MULTIPLICATION';
  left: AstNode;
  right: AstNode;
}

export interface AstFunction {
  type: 'FUNCTION';
  name: string;
  arguments: AstNode[];
}

export interface AstPower {
  type: 'POWER';
  expression: AstExpression;
  power: AstNode;
}
