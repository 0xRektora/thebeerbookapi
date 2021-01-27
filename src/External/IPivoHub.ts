interface Description {
    'en-CA': string;
    'fr-CA': string;
}

interface Label {
    center: number;
    angle: number;
    yCenter: number;
}

interface Details {
    percentage: number;
    styleId: string;
    label: Label;
    containerId: string;
}

interface Meta {
    count: number;
}

interface IProductsObject {
    id: string;
    companyId: string;
    name: string;
    imageUrl: string;
    labelUrl: string;
    description: Description;
    details: Details;
    createdAt: number;
    isDraft: boolean;
}

export interface IProductsResults {
    data: IProductsObject[];
    meta: Meta;
}
