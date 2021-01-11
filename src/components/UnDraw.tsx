import React, { VFC } from 'react'
import {
  Meeting,
  Teamwork,
  ScrumBoard,
  ThoughtProcess,
  InformedDecision,
} from 'public/unDraw'

const images = [Meeting, Teamwork, ScrumBoard, ThoughtProcess, InformedDecision]
const UnDraw: VFC = () => {
  const SVG = images[Math.floor(Math.random() * images.length)]
  return <SVG height={80} width={142} />
}

export default UnDraw
