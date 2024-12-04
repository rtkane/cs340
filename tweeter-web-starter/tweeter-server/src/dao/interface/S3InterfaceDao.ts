export interface S3Dao {
    createImage(
        file: string,
        userImageBytes: Uint8Array
    ): Promise<string>;

}