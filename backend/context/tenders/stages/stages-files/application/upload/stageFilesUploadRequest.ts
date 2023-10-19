export type StageFileUploadRequest = {
    tenderId: number,
    stageName: number,
    fileName: string
    file: Buffer,
}