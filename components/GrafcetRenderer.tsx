import React from 'react';
import { GrafcetData, GrafcetStep, GrafcetTransition, GrafcetLink } from '../types';

const STEP_SIZE = 40;
const ACTION_OFFSET_X = 60;
const ACTION_MIN_WIDTH = 120;
const ACTION_HEIGHT = 50;

interface Props {
  data: GrafcetData;
}

const GrafcetRenderer: React.FC<Props> = ({ data }) => {

  // Render Links (Lines)
  const renderLink = (link: GrafcetLink, index: number) => {
    return (
      <line
        key={`link-${index}`}
        x1={link.from.x}
        y1={link.from.y}
        x2={link.to.x}
        y2={link.to.y}
        stroke="black"
        strokeWidth="1.5"
      />
    );
  };

  // Render Steps (Squares)
  const renderStep = (step: GrafcetStep) => {
    const halfSize = STEP_SIZE / 2;
    const isInitial = step.type === 'initial';

    return (
      <g key={`step-${step.id}`}>
        {/* Connection Point Top */}
        <line x1={step.x} y1={step.y - halfSize} x2={step.x} y2={step.y - halfSize} stroke="black" />

        {/* Main Box */}
        <rect
          x={step.x - halfSize}
          y={step.y - halfSize}
          width={STEP_SIZE}
          height={STEP_SIZE}
          fill="white"
          stroke="black"
          strokeWidth="1.5"
        />

        {/* Inner Box for Initial Step (IEC 60848) */}
        {isInitial && (
          <rect
            x={step.x - halfSize + 4}
            y={step.y - halfSize + 4}
            width={STEP_SIZE - 8}
            height={STEP_SIZE - 8}
            fill="none"
            stroke="black"
            strokeWidth="1.5"
          />
        )}

        {/* Step Number */}
        <text
          x={step.x}
          y={step.y}
          dy="0.3em"
          textAnchor="middle"
          fontSize="14"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          {step.stepNumber}
        </text>

        {/* Actions */}
        {step.actions && step.actions.length > 0 && renderActions(step)}
      </g>
    );
  };

  // Render Actions (Rectangles on the right)
  const renderActions = (step: GrafcetStep) => {
    const actions = step.actions!;
    const boxHeight = actions.length * 20 + 20; // Dynamic height
    const startX = step.x + STEP_SIZE / 2;
    const lineEndX = startX + 20;

    // Find max text width estimate (rough)
    const maxChars = Math.max(...actions.flatMap(a => a.content).map(s => s.length));
    const boxWidth = Math.max(ACTION_MIN_WIDTH, maxChars * 7 + 20);

    return (
      <g>
        {/* Connection Line */}
        <line
          x1={startX}
          y1={step.y}
          x2={lineEndX}
          y2={step.y}
          stroke="black"
          strokeWidth="1.5"
        />

        {/* Action Box */}
        <rect
          x={lineEndX}
          y={step.y - boxHeight / 2}
          width={boxWidth}
          height={boxHeight}
          fill="white"
          stroke="black"
          strokeWidth="1.5"
        />

        {/* Action Text */}
        {actions.map((action, i) => (
          <g key={i}>
            {/* Action Type/Qualifier (if any, separate box on left inside) */}
            {/* Simplified for this demo: Just listing text */}
            {action.content.map((line, j) => (
              <text
                key={`${i}-${j}`}
                x={lineEndX + 10}
                y={step.y - boxHeight / 2 + 20 + (i * 20) + (j * 15)}
                fontSize="11"
                fontFamily="Arial"
                fill="black"
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </g>
    );
  };

  // Render Transitions (Crossbars)
  const renderTransition = (trans: GrafcetTransition) => {
    const width = 30; // Length of the horizontal bar for simple transitions
    const isDouble = trans.type === 'divergence_and' || trans.type === 'convergence_and';
    const isDivAnd = trans.type === 'divergence_and';
    const isConvAnd = trans.type === 'convergence_and';
    const AND_OFFSET = 25; // Vertical separation between transition bar and AND bars

    // Calculate the AND bar extent dynamically from connected steps
    let andBarHalfWidth = 100; // default fallback
    if (isDouble) {
      const connectedIds = Array.isArray(trans.to) && trans.to.length > 1
        ? trans.to
        : Array.isArray(trans.from) && trans.from.length > 1
          ? trans.from
          : [];
      if (connectedIds.length > 0) {
        const connectedSteps = data.steps.filter(s => connectedIds.includes(s.id));
        if (connectedSteps.length > 0) {
          const xs = connectedSteps.map(s => s.x);
          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          andBarHalfWidth = (maxX - minX) / 2 + 20; // +20 for some margin
        }
      }
    }

    // Position simple bar and AND bars separately
    // Divergence AND: simple bar at y, AND bars at y + AND_OFFSET
    // Convergence AND: AND bars at y, simple bar at y + AND_OFFSET
    const simpleBarY = isConvAnd ? trans.y + AND_OFFSET : trans.y;
    const andBarY = isDivAnd ? trans.y + AND_OFFSET : trans.y;

    // Label position: above the simple bar for divergence, below for convergence
    const labelY = isDivAnd ? simpleBarY - 10 : isConvAnd ? simpleBarY + 16 : trans.y;

    return (
      <g key={`trans-${trans.id}`}>
        {/* Simple Transition Bar */}
        <line
          x1={trans.x - width / 2}
          y1={simpleBarY}
          x2={trans.x + width / 2}
          y2={simpleBarY}
          stroke="black"
          strokeWidth="2"
        />

        {/* Double Bar for AND Divergence/Convergence (IEC Standard) */}
        {isDouble && (
          <line
            x1={trans.x - andBarHalfWidth}
            y1={andBarY - 4}
            x2={trans.x + andBarHalfWidth}
            y2={andBarY - 4}
            stroke="black"
            strokeWidth="2"
          />
        )}

        {isDouble && (
          <line
            x1={trans.x - andBarHalfWidth}
            y1={andBarY + 4}
            x2={trans.x + andBarHalfWidth}
            y2={andBarY + 4}
            stroke="black"
            strokeWidth="2"
          />
        )}

        {/* Condition Text */}
        <text
          x={trans.labelPos === 'left' ? trans.x - 20 : trans.x + 20}
          y={labelY}
          dy="0.3em"
          textAnchor={trans.labelPos === 'left' ? "end" : "start"}
          fontSize="12"
          fontFamily="monospace"
          fill="black"
        >
          {trans.condition}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-full overflow-auto grafcet-paper border shadow-inner p-4 rounded-lg">
      <svg
        viewBox={data.viewBox}
        className="w-full h-auto min-w-[600px]"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>

        {/* Links first so they are behind steps */}
        {data.links.map(renderLink)}

        {/* Transitions */}
        {data.transitions.map(renderTransition)}

        {/* Steps */}
        {data.steps.map(renderStep)}
      </svg>
    </div>
  );
};

export default GrafcetRenderer;