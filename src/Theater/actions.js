import React from 'react'
import { connect } from 'react-redux'

export const  THEATER_UPDATE    = 'THEATER_UPDATE';

export function theaterUpdate ( values ){
  return { type : THEATER_UPDATE , payload : values }
}
