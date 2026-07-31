import { collectMatrixTransforms, matrixFilterValues } from '#base/utils';

const MATRIX_TRANSFORMS = collectMatrixTransforms();

export const DynamicStyleFilters = () => {
    const transforms = MATRIX_TRANSFORMS;

    if (transforms.length === 0) return null;

    return (
        <svg aria-hidden className="pointer-events-none absolute size-0" focusable="false">
            <defs>
                {transforms.map(([id, ct]) => (
                    <filter key={id} id={id} colorInterpolationFilters="sRGB">
                        <feColorMatrix type="matrix" values={matrixFilterValues(ct)} />
                    </filter>
                ))}
            </defs>
        </svg>
    );
};

DynamicStyleFilters.displayName = 'DynamicStyleFilters';
