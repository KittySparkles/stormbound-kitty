import getStoriesForSearch from '../../helpers/getStoriesForSearch'

export default content => {
  const search = content.replace('!story', '').trim()

  if (search.length === 0) return

  const results = getStoriesForSearch(search)

  if (results.length === 0) return

  return results
    .slice(0, 2)
    .map(story => 'https://stormbound-kitty.com/stories/' + story.id)
    .join('\n')
}