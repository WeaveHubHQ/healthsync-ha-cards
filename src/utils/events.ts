export function fireEvent(node: HTMLElement, type: string, detail?: any) {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}
