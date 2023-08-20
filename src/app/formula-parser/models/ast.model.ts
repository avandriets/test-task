import { AstInterface, DFS, operators } from '../interfaces';
import { AbstractModel } from './abstract-model';

export class AstModel extends AbstractModel<AstInterface> {

  constructor(protected override data: AstInterface) {
    super(data);
  }

  getAstString(): string {
    return JSON.stringify(this.getData(), null, 2);
  }

  getFormula(): string {
    return this.astToFormula();
  }

  private astToFormula(): string {
    const dfs: DFS = (root: any): string => {
      if (!root) {
        return '';
      }

      if (root.type === 'PAREN') {
        return `(${dfs(root.expression)})`;
      }

      if (root.type === 'NEGATION') {
        return `-${dfs(root.expression)}`;
      }

      if (root.type === 'POWER') {
        return `${dfs(root.expression)}ˆ${dfs(root.power)}`;
      }

      if (root.type === 'FUNCTION') {
        const args = root.arguments.map((e: any) => dfs(e)).join(',');
        return `${root.name}(${args})`;
      }

      let left = dfs(root.left);
      let right = dfs(root.right);

      const value = operators[root.type] ?? root.value ?? root.name;

      return `${left}${value}${right}`;
    };

    return dfs(this.data);
  }
}
