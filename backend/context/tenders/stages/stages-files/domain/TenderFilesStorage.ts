
export interface TenderFilesStorage {
    upload(tenderId: number, fileName: string, file: Buffer): Promise<void>;
    // downloan(tenderId: number, fileName: string): Promise<Blob>;
}

