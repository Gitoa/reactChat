export function getGroupInfo(g_id) {
  fetch("/groupinfo/" + g_id).then(function(response) {
    if (response.ok || response.status === 304) {

    } else {
      
    }
  }).catch(err => {
    console.log(err)
  })
}