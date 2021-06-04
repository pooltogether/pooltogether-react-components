import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import classnames from 'classnames'

import { LoadingDots } from './LoadingDots'
import LogoDark from '../../assets/PoolTogetherLogos/pooltogether-p.svg'
import Logo from '../../assets/PoolTogetherLogos/pooltogether-p-purple.svg'
import { ThemeContext } from '../ThemeContextProvider'

export function LoadingLogo(props) {
  // TODO: Add back motion

  const { theme } = useContext(ThemeContext)

  return (
    <div className={classnames('flex flex-col', props.className)} style={{ width: 'min-content' }}>
      <img
        src={theme === 'dark' ? LogoDark : Logo}
        className='w-8 mx-auto'
        style={{ borderWidth: 0 }}
      />
      <LoadingDots />
    </div>
  )

  // return (
  //   <motion.div
  //     animate={!initialized ? 'enter' : 'exit'}
  //     transition={{ duration: 0.5, ease: 'easeIn' }}
  //     variants={{
  //       initial: {
  //         opacity: 1
  //       },
  //       enter: {
  //         opacity: 1
  //       },
  //       exit: {
  //         opacity: 0,
  //         transitionEnd: {
  //           display: 'none'
  //         }
  //       }
  //     }}
  //     className='h-screen w-screen fixed overflow-hidden t-0 r-0 l-0 b-0 text-white flex flex-col items-center justify-center'
  //     style={{
  //       backgroundColor: '#1E0B43',
  //       color: 'white',
  //       zIndex: 12345678
  //     }}
  //   >
  //     <img src={PoolTogetherMark} className='w-8 outline-none -mt-20' style={{ borderWidth: 0 }} />

  //     <div className='overflow-hidden'>
  //       <V3LoadingDots />
  //     </div>
  //   </motion.div>
  // )
}
