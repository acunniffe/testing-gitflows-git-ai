# Shark Rater
Aidan Cunniffe

## A quick demo of Git AI Rewrites

A TypeScript tool that uses Claude's vision capabilities to analyze and rate shark images on multiple criteria.

## Overview

Shark Rater analyzes SVG images and provides a comprehensive rating based on:
- **Shark Presence** (1 point): Whether the image actually contains a shark
- **Scary Factor** (1-5 points): How intimidating or scary the shark appears
- **Style Quality** (1-2 points): The artistic quality and polish of the image

Maximum possible score: 8 points

## Prerequisites

- Node.js and npm installed
- TypeScript (`ts-node`) for execution
- An Anthropic API key

## Installation

1. Install dependencies:
```bash
npm install @anthropic-ai/sdk
npm install -g ts-node typescript
```

2. Set your Anthropic API key:
```bash
export ANTHROPIC_API_KEY='your-api-key-here'
```

## Usage

Run the shark rater on any SVG file:

```bash
ts-node shark-rater.ts <path-to-svg>
```

### Example

```bash
ts-node shark-rater.ts ./my-shark-drawing.svg
```

### Sample Output

```
Analyzing shark image: ./my-shark-drawing.svg

🦈 SHARK RATING RESULTS 🦈
========================================
Has Shark: ✓ (1 point)
Scary Level: 🦈🦈🦈🦈 (4/5 points)
Style Quality: ⭐⭐ (2/2 points)
========================================
TOTAL SCORE: 7/8 points

Explanation: The image features a menacing great white shark
with sharp teeth and an aggressive pose. The style is polished
with smooth lines and good attention to detail.
```

## How It Works

The tool:
1. Reads the SVG file from disk
2. Converts it to base64 format
3. Sends it to Claude's vision API (claude-sonnet-4-5 model)
4. Receives structured ratings based on predefined criteria
5. Calculates a total score and displays formatted results

## Rating Criteria Details

- **Shark Points**: Binary score - either contains a shark (1) or doesn't (0)
- **Scary Points**: Subjective scale from 1 (cute/harmless) to 5 (terrifying)
- **Style Points**: Quality assessment - 1 for basic/simple, 2 for polished/artistic

## Error Handling

The tool will exit with an error if:
- No file path is provided
- ANTHROPIC_API_KEY environment variable is not set
- The SVG file cannot be read
- Claude's API returns an unexpected response format
