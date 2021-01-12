import React, { VFC } from 'react'
import TeamWork from 'public/unDraw/Teamwork'
import Brainstorming from 'public/unDraw/Brainstorming'
import ShareOpinion from 'public/unDraw/ShareOpinion'

type Props = {
  name: string
}

const images = {
  TeamWork: TeamWork,
  Brainstorming: Brainstorming,
  ShareOpinion: ShareOpinion,
}

const UnDraw: VFC<Props> = ({ name }) => {
  const Svg = images[name]
  return <Svg height={120} width={180} />
}

export default UnDraw
