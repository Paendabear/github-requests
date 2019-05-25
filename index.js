/* eslint-disable indent */
'use strict'
let store = {
    repositories: [],
}

function decorateRepo(repoData) {
    return {
        name: repoData.name,
        url: repoData.url,
    }
}

function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json());
}

function renderRepos() {
    const html= store.repositories.map(repo => {
        return `<li><a target="_blank" href="${repo.url}">${repo.name}</li>`
    })

    $('.repositories').html(html);
}

function main(){
    $('form#search').on('submit', e => {
    e.preventDefault();
    const username = $('#username').val();
    e.target.reset();

    getRepos(username)
        .then(repos => {
            store.repositories = repos.map(decorateRepo);

            renderRepos();
        })
    })
}

$(main);