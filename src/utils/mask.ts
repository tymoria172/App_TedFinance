// utils/masks.ts
export const maskCurrency = (value: string): string => {
    let valueFormatted = value.replace(/\D/g, '');
    valueFormatted = valueFormatted.replace(/(\d)(\d{2})$/, '$1,$2');
    valueFormatted = valueFormatted.replace(/(?=(\d{3})+(\D))\B/g, '.');
    return valueFormatted ? `R$ ${valueFormatted}` : '';
};

export const unmaskCurrency = (value: string): number => {
    if (!value) return 0;
    const unmasked = value.replace(/\D/g, '');
    return parseFloat(unmasked) / 100;
};