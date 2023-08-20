import { AstNode, DFS, MathOp } from '../interfaces';
import { AbstractModel } from './abstract-model';

export class AstModel extends AbstractModel<AstNode> {

  constructor(protected override data: AstNode) {
    super(data);
  }

  getAstString(): string {
    return JSON.stringify(this.getData(), null, 2);
  }

  getFormula(): string {
    return this.astToFormula();
  }

  private astToFormula(): string {
    const dfs: DFS = (root: AstNode): string => {
      if (!root) {
        return '';
      }

      switch (root.type) {
        case 'PAREN':
          return `(${dfs(root.expression)})`;
        case 'NEGATION':
          return `-${dfs(root.expression)}`;
        case 'POWER':
          return `${dfs(root.expression)}ˆ${dfs(root.power)}`;
        case 'FUNCTION':
          const args = root.arguments.map((e: any) => dfs(e)).join(',');
          return `${root.name}(${args})`;
        case 'ADDITION':
        case 'SUBTRACTION':
        case 'DIVISION':
        case 'MULTIPLICATION':
          return `${dfs(root.left)}${MathOp[root.type]}${dfs(root.right)}`;
        case 'PI':
          return 'PI';
        case 'E':
          return 'E';
        case 'NUMBER':
          return `${root.value}`;
        default:
          return root.name;
      }
    };

    return dfs(this.data);
  }
}
