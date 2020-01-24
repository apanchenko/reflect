/**
 * Image represents a source or target folder
 * to compare and reflect
 */
export interface Image {
  /**
   * Add file
   */
  onFile(name: string) : void;
}