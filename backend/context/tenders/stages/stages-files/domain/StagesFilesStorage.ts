
export interface StagesFilesStorage {
    upload(tenderId: number, stageName: number, fileName: string, file: Buffer): Promise<void>;
    // downloan(tenderId: number, fileName: string): Promise<Blob>;
    findFileNameByStage(tenderId: number, stageName: number): Promise<Array<{ fileName: string, downloadUrl: string }>>;
}

