export type TenderFilesUploadRequest = {
    tenderId: number,
    fileName: string
    file: Buffer,
}