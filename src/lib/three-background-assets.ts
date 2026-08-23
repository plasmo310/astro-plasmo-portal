// 3D 背景(エレキベア)のアセットとページ判定を、レイアウトとクライアント
// スクリプトの双方から参照するための定義。
// レイアウト側は preload タグの出力に、スクリプト側は実際の読み込みに使う。

export const HOME_PATHS = ["/", "/en", "/en/"];

export const MODEL_GLB_PATH = "/model/SM_Elekibear.glb";
export const MODEL_TEXTURE_PATH = "/model/T_Elekibear.png";

export function isHomePath(pathname: string): boolean {
  return HOME_PATHS.includes(pathname);
}
