export interface DropdownProps {
    value: string;
    label: string;
}

export interface DropdownComponentProps {
    options: DropdownProps[]; // options should be an array of DropdownProps
}