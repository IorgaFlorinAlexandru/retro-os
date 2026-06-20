export function createClassicBorderElement(height: number, width: number): HTMLDivElement {
    const divElement = document.createElement("div");
    divElement.className = 'win95-drag-outline'
    divElement.style.width = width + "px";
    divElement.style.height = height + "px";
    divElement.style.left = `-${window.innerWidth}px`
    divElement.style.top = `-${window.innerHeight}px`

    return divElement;
}