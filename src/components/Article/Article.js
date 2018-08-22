import React from 'react'
import styled from 'styled-components'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

const Body = styled.article`
  text-align: left;
  margin-bottom: 2em;
  
  img {
    max-width: 100%;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  p {
    margin-top: 0;
  }
`

const LeaveLink = styled(Typography)`
  position: absolute;
  bottom: 0;
  right: 1em;
  text-decoration: underline;
  padding-top: 1em;
`

const Desc = styled(Typography)`
  min-height: 50px;
  padding-bottom: 1em;
`

const DescContainer = styled(Grid)`
  position: relative;
`

const Article = ({title, pubDate, description, creator, link, encoded}) => {
  const parser = new DOMParser()
  const html = parser.parseFromString(description || encoded, "text/html")
  const imgSrc = html.getElementsByTagName('img')[0]?.src.replace(/max\/\d*/, 'max/336')
  const desc = html.getElementsByTagName('p')[1]?.innerHTML

  const isImg = !/^https:\/\/medium\.com\//.test(imgSrc)

  return (
    <Body>
      <Grid container spacing={16}>
        <Hidden smUp>
          <Grid item xs={12}>
            <Typography variant="title" gutterBottom>
              <a href={link}>{title}</a>
            </Typography>
          </Grid>
        </Hidden>
        {
          isImg && (
            <Grid item xs={12} sm={6}>
              <a href={link}>
                <img src={imgSrc} alt={title}/>
              </a>
            </Grid>
          )
        }
        <DescContainer item xs={12 } sm={isImg ? 6 : 12}>
          <Hidden xsDown>
            <Typography variant="title" gutterBottom>
              <a href={link}>{title}</a>
            </Typography>
          </Hidden>
          <Typography variant="caption" gutterBottom>
            {pubDate}
          </Typography>
          <Desc gutterBottom dangerouslySetInnerHTML={{__html: desc}} />
          <LeaveLink align="right" variant="button">
            <a href={link}>
              Check it on medium >
            </a>
          </LeaveLink>
        </DescContainer>
      </Grid>
    </Body>
  )
}

export default Article