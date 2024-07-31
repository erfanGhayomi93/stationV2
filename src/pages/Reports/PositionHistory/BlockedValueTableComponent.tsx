import { ICellRendererParams } from "ag-grid-community";
import { useTranslation } from "react-i18next";
import { seprateNumber } from "src/utils/helpers";

const BlockedValueTableComponent = ({ data }: ICellRendererParams<IResponsePositionHistory>) => {
	const { t } = useTranslation();

	const { positionCount, blockCount, marginBlockedValue, blockType, positionSide, positionBlockTitle } = data || {};

	const label = blockType === 'Account' ? ` ${t('common.rial')}` : blockType === 'Position' ? `${t('common.position')} ` + (positionBlockTitle ? `(${positionBlockTitle})` : '') : blockType === 'Portfolio' ? ` ${t('common.share')}` : "";

	const getValue = () => {
		if (blockType === 'Account') return seprateNumber(marginBlockedValue || 0);
		if (blockType === 'Portfolio') return seprateNumber(blockCount || 0);
		if (blockType === 'Position') return seprateNumber(positionCount || 0);
	};

	if (!data || positionSide !== 'Sell') return <div>{'-'}</div>;

	return (
		<div className="w-full flex items-center justify-center gap-1">
			<div className="ltr">{getValue()}</div>
			<div>{label}</div>
		</div>
	);
};

export default BlockedValueTableComponent;