import { StagesFilesStorage } from "../../domain/StagesFilesStorage";
import { findFilesNameByStageRequest } from "./findFilesNameByStageRequest";


export class FilesNameByStageFinder {
  constructor(
    private readonly stagesFilesStorage: StagesFilesStorage,
  ) { }

  async findStageFilesName(request: findFilesNameByStageRequest): Promise<Array<{ fileName: string, downloadUrl: string }>> {
    const FilesName = await this.stagesFilesStorage.findFileNameByStage(request.tenderId, request.stageName);
    return FilesName
  }
}
