import React from 'react'
import Step from "./Step"
import { useSelector } from 'react-redux'

const Steps = () => {
  const page = useSelector((e) => e.page.value)
  return (
    <div className='Steps'>
      <Step step={1} title={"ACCOUNT"} active={page === 0} />
      <Step step={2} title={"USER DETAILS"} active={page === 1} />
      <Step step={3} title={"ACTIVITY"} active={page === 2} />
      <Step step={4} title={"SELECT GOAL"} active={page === 3} />
      <Step step={5} title={"ALL SET!"} active={page >= 4} />

    </div>
  )
}

export default Steps