let searchText = document.getElementById("searchText");
searchText.addEventListener("keyup", (e) => {
  let searchValue = e.target.value;
  if (e.keyCode == 13) {
    githubFinder(searchValue);
  }
});

let mic = document.querySelector("#microphone");
mic.addEventListener("click", MicroPhone);

function MicroPhone() {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  recognition.addEventListener("result", (e) => {
    let transScript = e.results[0][0].transcript.replace(/\s/g, "");//replace white space into empty
    let searchValue = (searchText.value = transScript);
    githubFinder(searchValue);
  });
  recognition.start();
}

function githubFinder(search) {
  let Client_ID = "Iv1.e08a0bef4e61188a";
  let Client_Secret = "f84826c78ce0635f7ce7d4e50f4cbd1e30adaf07";
  let githubEndpoint = `https://api.github.com/users/${search}?client_id=$
    {Client_ID}&client_secret=${Client_Secret}`;

  window
    .fetch(githubEndpoint)
    .then((data) => {
      data
        .json()
        .then((user) => {
          let {
            login,
            avatar_url,
            html_url,
            company,
            location,
            bio,
            publix_repos,
            followers,
            created_at,
          } = user;
          document.getElementById("template").innerHTML = `
            <section id = "chlidBlock">
            <article>
            <div class="proflie_img">
            <img src=${avatar_url} alt=${login} />
            </div>
            <div class="proflie_details">
            <ul>
            <li>company :${company}</li>
            <li>Designation :${bio}</li>
            <li>Repositories :${publix_repos}</li>
            <li>Location${location}</li>
            <li>Followers${followers}</li>
            <li>Create at :${created_at}</li>
            <li><a href=${html_url}>Go to Proflie</a></li>
            </ul>
            </div>
            </article>
            </section>
             `;
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}