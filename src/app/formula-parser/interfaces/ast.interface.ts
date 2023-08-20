export type AstNode = 'PAREN' | 'NUMBER' | 'ADDITION' | 'SUBTRACTION' | 'DIVISION'
  | 'MULTIPLICATION' | 'FUNCTION' | 'POWER';

export type DFS = (a: any) => string;
export type Executor = (node: any, f: DFS) => string;

export interface AstPrimitive {
  type: AstNode;
  value: any;
}

export interface AstInterface {
  type: AstNode;
  expression?: AstInterface;
  left?: AstPrimitive;
  right?: AstPrimitive;
}

export const operators: { [key: string]: string } = {
  'ADDITION': '+',
  'SUBTRACTION': '-',
  'DIVISION': '/',
  'MULTIPLICATION': '*',
  'PI': 'PI',
  'E': 'E',
};

export const templateActions: { [key: string]: Executor } = {
  'PAREN': (node: any, f: DFS): string => `(${f(node.expression)})`,
  'NEGATION': (node: any, f: DFS): string => `-${f(node.expression)}`,
  'POWER': (node: any, f: DFS): string => `${f(node.expression)}ˆ${f(node.power)}`,
  'FUNCTION': (node: any, f: DFS): string => {
    const args = node.arguments.map((e: any) => f(e)).join(',');
    return `${node.name}(${args})`;
  },
  // 'ADDITION': (node: any, f: DFS): string => '+',
  // 'SUBTRACTION': (node: any, f: DFS): string => '-',
  // 'DIVISION': (node: any, f: DFS): string => '/',
  // 'MULTIPLICATION': (node: any, f: DFS): string => '*',
  // 'PI': (node: any, f: DFS): string => 'PI',
  // 'E': (node: any, f: DFS): string => 'E',
};
