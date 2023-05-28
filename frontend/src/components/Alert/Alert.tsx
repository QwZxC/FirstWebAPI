import React, { FC } from 'react'

interface AlertProps {
	children: any,
  open: boolean,
  setOpen: (open: boolean) => void

}

export const Alert: FC<AlertProps>= ({children}) => {
  return (
    <div className=''>{children}</div>
  )
}
