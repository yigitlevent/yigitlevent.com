import { useCallback, useEffect, useRef, useState } from "react";


export interface BandBlock {
  index: number;
  angle: number;
  currentAmount: number;
  targetAmount: number;
  items: string[];
}

export interface MagicWheelConstants {
  canvasSize: number;
  circleRadius: number;
  circleOffset: number;
  innerCircleRadius: number;
  textOffset: number;
  rotationSpeed: number;
}

interface UseMagicWheelProps {
  context: CanvasRenderingContext2D | undefined;
  bands: Record<string, BandBlock>;
  setBands: React.Dispatch<React.SetStateAction<Record<string, BandBlock>>>;
  availableBands: string[];
}

interface UseMagicWheelReturn {
  constants: MagicWheelConstants;
  isRotating: boolean;
  prayed: boolean;
  setTargetAmounts: (steps?: number, direction?: number) => void;
  setFacet: (facetKey: string, itemIndex: number) => void;
  reset: () => void;
}

function RandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useMagicWheel({
  context,
  bands,
  setBands,
  availableBands
}: UseMagicWheelProps): UseMagicWheelReturn {
  const [constants] = useState<MagicWheelConstants>({
    canvasSize: 580,
    circleRadius: 32,
    circleOffset: 90,
    innerCircleRadius: 200,
    textOffset: 100,
    rotationSpeed: 0.04
  });

  const [isRotating, setIsRotating] = useState(false);
  const [prayed, setPrayed] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  const setFacet = useCallback(
    (facetKey: string, itemIndex: number) => {
      setBands((prev: Record<string, BandBlock>) => ({
        ...prev,
        [facetKey]: {
          ...prev[facetKey],
          targetAmount: -itemIndex
        }
      }));
    },
    [setBands]
  );

  const setTargetAmounts = useCallback(() => {
    setPrayed(true);
    setIsRotating(true);

    const getRandomRotation = (): number =>
      ((Math.random() > 0.5) ? 1 : -1) * RandomNumber(1, 6);

    const revisedBands = Object.entries(bands).reduce<Record<string, BandBlock>>(
      (acc, [key, band]) => {
        const isAvailable = availableBands.includes(key);
        if (!isAvailable) {
          acc[key] = { ...band, targetAmount: band.currentAmount };
        }
        else {
          acc[key] = { ...band, targetAmount: band.targetAmount + getRandomRotation() };
        }
        return acc;
      },
      {}
    );

    setBands(revisedBands);
  }, [bands, setBands, availableBands]);

  const reset = useCallback(() => {
    const revisedBands = Object.entries(bands).reduce<Record<string, BandBlock>>(
      (acc, [key, band]) => {
        acc[key] = { ...band, targetAmount: 0, currentAmount: 0 };
        return acc;
      },
      {}
    );
    setBands(revisedBands);
    setPrayed(false);
    setIsRotating(false);
  }, [bands, setBands]);

  const doRotation = useCallback(() => {
    if (!context) return;

    context.clearRect(0, 0, constants.canvasSize, constants.canvasSize);

    let allDone = true;

    for (const key of availableBands) {
      const band = bands[key];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!band) continue;

      const bandIndex = band.index;
      const distancePerCharacter = constants.circleRadius * (bandIndex + 1) + constants.textOffset;
      const anglePerCharacter = 8 * (1 / distancePerCharacter);

      const textStartAngles: [string, number][] = band.items.map((name, itemIndex) => {
        const initialStart = band.currentAmount * band.angle;
        const itemMargin = itemIndex * band.angle;
        const halfBack = anglePerCharacter + ((anglePerCharacter * name.length) / 2);
        return [name, (initialStart + itemMargin - halfBack)];
      });

      textStartAngles.forEach(([name, startAngle]) => {
        context.save();
        context.translate(constants.canvasSize / 2, constants.canvasSize / 2);
        context.rotate(startAngle);

        for (const char of name) {
          context.rotate(anglePerCharacter);
          context.save();
          context.translate(0, -1 * distancePerCharacter);
          context.font = "14px sans-serif";
          context.fillStyle = "#ff9f1c";
          context.fillText(char.toLowerCase(), 0, 0);
          context.restore();
        }

        context.restore();
      });

      // Update current amount towards target
      if (band.currentAmount.toFixed(1) === band.targetAmount.toFixed(1)) {
        setBands(prev => ({
          ...prev,
          [key]: { ...band, currentAmount: band.targetAmount }
        }));
      }
      else if (band.currentAmount < band.targetAmount) {
        setBands(prev => ({
          ...prev,
          [key]: { ...band, currentAmount: band.currentAmount + constants.rotationSpeed }
        }));
        allDone = false;
      }
      else if (band.currentAmount > band.targetAmount) {
        setBands(prev => ({
          ...prev,
          [key]: { ...band, currentAmount: band.currentAmount - constants.rotationSpeed }
        }));
        allDone = false;
      }
    }

    if (isRotating && allDone) {
      setIsRotating(false);
    }
  }, [context, bands, constants, availableBands, isRotating, setBands]);

  useEffect(() => {
    if (!context || !isRotating) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    const animate = (): void => {
      doRotation();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [context, isRotating, doRotation]);

  return {
    constants,
    isRotating,
    prayed,
    setTargetAmounts,
    setFacet,
    reset
  };
}
