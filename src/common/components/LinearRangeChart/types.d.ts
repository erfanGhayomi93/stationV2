type twoParameterArray = [number, number];
/** RulerSettingType  */
interface RulerSettingType {
  step?: number;
  degree?: number;
  className?: string;
  rulerClassName?: string;
  threshold?: boolean;
}
/**  ThresholdSettingType */

interface ThresholdSettingType {
  thresholdStartClassName?: string;
  thresholdEndClassName?: string;
  thresholdStartLabel?: string;
  thresholdEndLabel?: string;
}
/** ExchangeSettingType */

interface ExchangeSettingType {
  exchangeStartClassName?: string;
  exchangeEndClassName?: string;
  exchangeStartLabel?: string;
  exchangeEndLabel?: string;
}
/**  BoundarySettingType */

interface BoundarySettingType {
  boundaryStartClassName?: string;
  boundaryEndClassName?: string;
  boundaryStartLabel?: string;
  boundaryEndLabel?: string;
  className?: string;
  badge?: boolean;
}
/**  OriginSettingType */

interface OriginSettingType {
  className?: string;
}

/**
 *  Icons Type
 */
interface FooterSettingType {
  className?: string;
}
interface StartEndIcon {
  start: JSX.Element;
  end: JSX.Element;
}

interface ILinearRangeChartApi {
  /**
   * BOOLEAN
   */
  footer?: boolean;
  rtl?: boolean;
  ruler?: boolean;
  positiveColor?: string;
  negativeColor?: string;
  badge?: boolean;
  gradient?: boolean;

  /**
   * DATA
   */
  thresholdData?: twoParameterArray;
  boundaryData: twoParameterArray;
  exchangeData: twoParameterArray;
  originData: number;

  /**
   * SETTING
   */

  rulerSetting?: RulerSettingType;
  thresholdSetting?: ThresholdSettingType;
  boundarySetting?: BoundarySettingType;
  originSetting?: OriginSettingType;
  exchangeSetting?: ExchangeSettingType;
  footerSetting?: FooterSettingType;
  /**
   *  Icons
   */
  thresholdIcons?: StartEndIcon;
  originIcons?: JSX.Element;
  boundaryIcons?: StartEndIcon;
  exchangeIcons?: StartEndIcon;
}
