/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      name
      weblink
      createdAt
      updatedAt
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        weblink
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSportsmanshipPoint = /* GraphQL */ `
  query GetSportsmanshipPoint($id: ID!) {
    getSportsmanshipPoint(id: $id) {
      id
      points
      createdAt
      updatedAt
    }
  }
`;
export const listSportsmanshipPoints = /* GraphQL */ `
  query ListSportsmanshipPoints(
    $filter: ModelSportsmanshipPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSportsmanshipPoints(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        points
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      user_id
      soccer_stats {
        id
        teamid
        division
        position
        goals
        assists
        yellow_cards
        red_cards
        games_played
      }
      teamID
      role
      createdAt
      updatedAt
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        soccer_stats {
          id
          teamid
          division
          position
          goals
          assists
          yellow_cards
          red_cards
          games_played
        }
        teamID
        role
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const playersByTeamID = /* GraphQL */ `
  query PlayersByTeamID(
    $teamID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    playersByTeamID(
      teamID: $teamID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user_id
        soccer_stats {
          id
          teamid
          division
          position
          goals
          assists
          yellow_cards
          red_cards
          games_played
        }
        teamID
        role
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      division
      date
      location
      status
      home_roster
      away_roster
      home_score
      away_score
      goals
      round
      referees
      HomeTeam {
        id
        name
        founded
        home_colour
        away_colour
        TeamNotes {
          items {
            id
            date
            description
            team_id
            author_id
            createdAt
            updatedAt
          }
          nextToken
        }
        team_history
        team_picture
        Divisions {
          items {
            id
            divisionId
            teamId
            division {
              id
              name
              abbreviation
              teams
              season
              Games {
                nextToken
              }
              level
              description
              is_playoff
              Teams {
                nextToken
              }
              createdAt
              updatedAt
            }
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        Players {
          items {
            id
            user_id
            soccer_stats {
              id
              teamid
              division
              position
              goals
              assists
              yellow_cards
              red_cards
              games_played
            }
            teamID
            role
            createdAt
            updatedAt
          }
          nextToken
        }
        captains
        sport
        createdAt
        updatedAt
      }
      AwayTeam {
        id
        name
        founded
        home_colour
        away_colour
        TeamNotes {
          items {
            id
            date
            description
            team_id
            author_id
            createdAt
            updatedAt
          }
          nextToken
        }
        team_history
        team_picture
        Divisions {
          items {
            id
            divisionId
            teamId
            division {
              id
              name
              abbreviation
              teams
              season
              Games {
                nextToken
              }
              level
              description
              is_playoff
              Teams {
                nextToken
              }
              createdAt
              updatedAt
            }
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        Players {
          items {
            id
            user_id
            soccer_stats {
              id
              teamid
              division
              position
              goals
              assists
              yellow_cards
              red_cards
              games_played
            }
            teamID
            role
            createdAt
            updatedAt
          }
          nextToken
        }
        captains
        sport
        createdAt
        updatedAt
      }
      home_color
      away_color
      createdAt
      updatedAt
      gameHomeTeamId
      gameAwayTeamId
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        division
        date
        location
        status
        home_roster
        away_roster
        home_score
        away_score
        goals
        round
        referees
        HomeTeam {
          id
          name
          founded
          home_colour
          away_colour
          TeamNotes {
            items {
              id
              date
              description
              team_id
              author_id
              createdAt
              updatedAt
            }
            nextToken
          }
          team_history
          team_picture
          Divisions {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          Players {
            items {
              id
              user_id
              soccer_stats {
                id
                teamid
                division
                position
                goals
                assists
                yellow_cards
                red_cards
                games_played
              }
              teamID
              role
              createdAt
              updatedAt
            }
            nextToken
          }
          captains
          sport
          createdAt
          updatedAt
        }
        AwayTeam {
          id
          name
          founded
          home_colour
          away_colour
          TeamNotes {
            items {
              id
              date
              description
              team_id
              author_id
              createdAt
              updatedAt
            }
            nextToken
          }
          team_history
          team_picture
          Divisions {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          Players {
            items {
              id
              user_id
              soccer_stats {
                id
                teamid
                division
                position
                goals
                assists
                yellow_cards
                red_cards
                games_played
              }
              teamID
              role
              createdAt
              updatedAt
            }
            nextToken
          }
          captains
          sport
          createdAt
          updatedAt
        }
        home_color
        away_color
        createdAt
        updatedAt
        gameHomeTeamId
        gameAwayTeamId
      }
      nextToken
    }
  }
`;
export const gamesByDivision = /* GraphQL */ `
  query GamesByDivision(
    $division: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesByDivision(
      division: $division
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        division
        date
        location
        status
        home_roster
        away_roster
        home_score
        away_score
        goals
        round
        referees
        HomeTeam {
          id
          name
          founded
          home_colour
          away_colour
          TeamNotes {
            items {
              id
              date
              description
              team_id
              author_id
              createdAt
              updatedAt
            }
            nextToken
          }
          team_history
          team_picture
          Divisions {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          Players {
            items {
              id
              user_id
              soccer_stats {
                id
                teamid
                division
                position
                goals
                assists
                yellow_cards
                red_cards
                games_played
              }
              teamID
              role
              createdAt
              updatedAt
            }
            nextToken
          }
          captains
          sport
          createdAt
          updatedAt
        }
        AwayTeam {
          id
          name
          founded
          home_colour
          away_colour
          TeamNotes {
            items {
              id
              date
              description
              team_id
              author_id
              createdAt
              updatedAt
            }
            nextToken
          }
          team_history
          team_picture
          Divisions {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          Players {
            items {
              id
              user_id
              soccer_stats {
                id
                teamid
                division
                position
                goals
                assists
                yellow_cards
                red_cards
                games_played
              }
              teamID
              role
              createdAt
              updatedAt
            }
            nextToken
          }
          captains
          sport
          createdAt
          updatedAt
        }
        home_color
        away_color
        createdAt
        updatedAt
        gameHomeTeamId
        gameAwayTeamId
      }
      nextToken
    }
  }
`;
export const getDivision = /* GraphQL */ `
  query GetDivision($id: ID!) {
    getDivision(id: $id) {
      id
      name
      abbreviation
      teams
      season
      Games {
        items {
          id
          division
          date
          location
          status
          home_roster
          away_roster
          home_score
          away_score
          goals
          round
          referees
          HomeTeam {
            id
            name
            founded
            home_colour
            away_colour
            TeamNotes {
              items {
                id
                date
                description
                team_id
                author_id
                createdAt
                updatedAt
              }
              nextToken
            }
            team_history
            team_picture
            Divisions {
              items {
                id
                divisionId
                teamId
                createdAt
                updatedAt
              }
              nextToken
            }
            Players {
              items {
                id
                user_id
                teamID
                role
                createdAt
                updatedAt
              }
              nextToken
            }
            captains
            sport
            createdAt
            updatedAt
          }
          AwayTeam {
            id
            name
            founded
            home_colour
            away_colour
            TeamNotes {
              items {
                id
                date
                description
                team_id
                author_id
                createdAt
                updatedAt
              }
              nextToken
            }
            team_history
            team_picture
            Divisions {
              items {
                id
                divisionId
                teamId
                createdAt
                updatedAt
              }
              nextToken
            }
            Players {
              items {
                id
                user_id
                teamID
                role
                createdAt
                updatedAt
              }
              nextToken
            }
            captains
            sport
            createdAt
            updatedAt
          }
          home_color
          away_color
          createdAt
          updatedAt
          gameHomeTeamId
          gameAwayTeamId
        }
        nextToken
      }
      level
      description
      is_playoff
      Teams {
        items {
          id
          divisionId
          teamId
          division {
            id
            name
            abbreviation
            teams
            season
            Games {
              items {
                id
                division
                date
                location
                status
                home_roster
                away_roster
                home_score
                away_score
                goals
                round
                referees
                home_color
                away_color
                createdAt
                updatedAt
                gameHomeTeamId
                gameAwayTeamId
              }
              nextToken
            }
            level
            description
            is_playoff
            Teams {
              items {
                id
                divisionId
                teamId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          team {
            id
            name
            founded
            home_colour
            away_colour
            TeamNotes {
              items {
                id
                date
                description
                team_id
                author_id
                createdAt
                updatedAt
              }
              nextToken
            }
            team_history
            team_picture
            Divisions {
              items {
                id
                divisionId
                teamId
                createdAt
                updatedAt
              }
              nextToken
            }
            Players {
              items {
                id
                user_id
                teamID
                role
                createdAt
                updatedAt
              }
              nextToken
            }
            captains
            sport
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listDivisions = /* GraphQL */ `
  query ListDivisions(
    $filter: ModelDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        abbreviation
        teams
        season
        Games {
          items {
            id
            division
            date
            location
            status
            home_roster
            away_roster
            home_score
            away_score
            goals
            round
            referees
            HomeTeam {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            AwayTeam {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            home_color
            away_color
            createdAt
            updatedAt
            gameHomeTeamId
            gameAwayTeamId
          }
          nextToken
        }
        level
        description
        is_playoff
        Teams {
          items {
            id
            divisionId
            teamId
            division {
              id
              name
              abbreviation
              teams
              season
              Games {
                nextToken
              }
              level
              description
              is_playoff
              Teams {
                nextToken
              }
              createdAt
              updatedAt
            }
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const divisionsBySeason = /* GraphQL */ `
  query DivisionsBySeason(
    $season: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    divisionsBySeason(
      season: $season
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        abbreviation
        teams
        season
        Games {
          items {
            id
            division
            date
            location
            status
            home_roster
            away_roster
            home_score
            away_score
            goals
            round
            referees
            HomeTeam {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            AwayTeam {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            home_color
            away_color
            createdAt
            updatedAt
            gameHomeTeamId
            gameAwayTeamId
          }
          nextToken
        }
        level
        description
        is_playoff
        Teams {
          items {
            id
            divisionId
            teamId
            division {
              id
              name
              abbreviation
              teams
              season
              Games {
                nextToken
              }
              level
              description
              is_playoff
              Teams {
                nextToken
              }
              createdAt
              updatedAt
            }
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeason = /* GraphQL */ `
  query GetSeason($id: ID!) {
    getSeason(id: $id) {
      id
      league
      name
      abbreviation
      start_date
      end_date
      Divisions {
        items {
          id
          name
          abbreviation
          teams
          season
          Games {
            items {
              id
              division
              date
              location
              status
              home_roster
              away_roster
              home_score
              away_score
              goals
              round
              referees
              HomeTeam {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              AwayTeam {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              home_color
              away_color
              createdAt
              updatedAt
              gameHomeTeamId
              gameAwayTeamId
            }
            nextToken
          }
          level
          description
          is_playoff
          Teams {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      is_completed
      createdAt
      updatedAt
    }
  }
`;
export const listSeasons = /* GraphQL */ `
  query ListSeasons(
    $filter: ModelSeasonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeasons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        league
        name
        abbreviation
        start_date
        end_date
        Divisions {
          items {
            id
            name
            abbreviation
            teams
            season
            Games {
              items {
                id
                division
                date
                location
                status
                home_roster
                away_roster
                home_score
                away_score
                goals
                round
                referees
                home_color
                away_color
                createdAt
                updatedAt
                gameHomeTeamId
                gameAwayTeamId
              }
              nextToken
            }
            level
            description
            is_playoff
            Teams {
              items {
                id
                divisionId
                teamId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        is_completed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const seasonsByLeague = /* GraphQL */ `
  query SeasonsByLeague(
    $league: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSeasonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    seasonsByLeague(
      league: $league
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        league
        name
        abbreviation
        start_date
        end_date
        Divisions {
          items {
            id
            name
            abbreviation
            teams
            season
            Games {
              items {
                id
                division
                date
                location
                status
                home_roster
                away_roster
                home_score
                away_score
                goals
                round
                referees
                home_color
                away_color
                createdAt
                updatedAt
                gameHomeTeamId
                gameAwayTeamId
              }
              nextToken
            }
            level
            description
            is_playoff
            Teams {
              items {
                id
                divisionId
                teamId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        is_completed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLeague = /* GraphQL */ `
  query GetLeague($id: ID!) {
    getLeague(id: $id) {
      id
      name
      sport
      date_founded
      cost_per_individual
      cost_per_team
      coordinators
      Seasons {
        items {
          id
          league
          name
          abbreviation
          start_date
          end_date
          Divisions {
            items {
              id
              name
              abbreviation
              teams
              season
              Games {
                nextToken
              }
              level
              description
              is_playoff
              Teams {
                nextToken
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          is_completed
          createdAt
          updatedAt
        }
        nextToken
      }
      description
      number_of_periods
      time_per_period
      createdAt
      updatedAt
    }
  }
`;
export const listLeagues = /* GraphQL */ `
  query ListLeagues(
    $filter: ModelLeagueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeagues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        sport
        date_founded
        cost_per_individual
        cost_per_team
        coordinators
        Seasons {
          items {
            id
            league
            name
            abbreviation
            start_date
            end_date
            Divisions {
              items {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              nextToken
            }
            is_completed
            createdAt
            updatedAt
          }
          nextToken
        }
        description
        number_of_periods
        time_per_period
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeamNote = /* GraphQL */ `
  query GetTeamNote($id: ID!) {
    getTeamNote(id: $id) {
      id
      date
      description
      team_id
      author_id
      createdAt
      updatedAt
    }
  }
`;
export const listTeamNotes = /* GraphQL */ `
  query ListTeamNotes(
    $filter: ModelTeamNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        description
        team_id
        author_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const teamNotesByTeam_id = /* GraphQL */ `
  query TeamNotesByTeam_id(
    $team_id: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTeamNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamNotesByTeam_id(
      team_id: $team_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        description
        team_id
        author_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      founded
      home_colour
      away_colour
      TeamNotes {
        items {
          id
          date
          description
          team_id
          author_id
          createdAt
          updatedAt
        }
        nextToken
      }
      team_history
      team_picture
      Divisions {
        items {
          id
          divisionId
          teamId
          division {
            id
            name
            abbreviation
            teams
            season
            Games {
              items {
                id
                division
                date
                location
                status
                home_roster
                away_roster
                home_score
                away_score
                goals
                round
                referees
                home_color
                away_color
                createdAt
                updatedAt
                gameHomeTeamId
                gameAwayTeamId
              }
              nextToken
            }
            level
            description
            is_playoff
            Teams {
              items {
                id
                divisionId
                teamId
                createdAt
                updatedAt
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          team {
            id
            name
            founded
            home_colour
            away_colour
            TeamNotes {
              items {
                id
                date
                description
                team_id
                author_id
                createdAt
                updatedAt
              }
              nextToken
            }
            team_history
            team_picture
            Divisions {
              items {
                id
                divisionId
                teamId
                createdAt
                updatedAt
              }
              nextToken
            }
            Players {
              items {
                id
                user_id
                teamID
                role
                createdAt
                updatedAt
              }
              nextToken
            }
            captains
            sport
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      Players {
        items {
          id
          user_id
          soccer_stats {
            id
            teamid
            division
            position
            goals
            assists
            yellow_cards
            red_cards
            games_played
          }
          teamID
          role
          createdAt
          updatedAt
        }
        nextToken
      }
      captains
      sport
      createdAt
      updatedAt
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        founded
        home_colour
        away_colour
        TeamNotes {
          items {
            id
            date
            description
            team_id
            author_id
            createdAt
            updatedAt
          }
          nextToken
        }
        team_history
        team_picture
        Divisions {
          items {
            id
            divisionId
            teamId
            division {
              id
              name
              abbreviation
              teams
              season
              Games {
                nextToken
              }
              level
              description
              is_playoff
              Teams {
                nextToken
              }
              createdAt
              updatedAt
            }
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        Players {
          items {
            id
            user_id
            soccer_stats {
              id
              teamid
              division
              position
              goals
              assists
              yellow_cards
              red_cards
              games_played
            }
            teamID
            role
            createdAt
            updatedAt
          }
          nextToken
        }
        captains
        sport
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlayerNote = /* GraphQL */ `
  query GetPlayerNote($id: ID!) {
    getPlayerNote(id: $id) {
      id
      player_id
      date
      description
      author_id
      createdAt
      updatedAt
    }
  }
`;
export const listPlayerNotes = /* GraphQL */ `
  query ListPlayerNotes(
    $filter: ModelPlayerNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayerNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        player_id
        date
        description
        author_id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeamDivision = /* GraphQL */ `
  query GetTeamDivision($id: ID!) {
    getTeamDivision(id: $id) {
      id
      divisionId
      teamId
      division {
        id
        name
        abbreviation
        teams
        season
        Games {
          items {
            id
            division
            date
            location
            status
            home_roster
            away_roster
            home_score
            away_score
            goals
            round
            referees
            HomeTeam {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            AwayTeam {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            home_color
            away_color
            createdAt
            updatedAt
            gameHomeTeamId
            gameAwayTeamId
          }
          nextToken
        }
        level
        description
        is_playoff
        Teams {
          items {
            id
            divisionId
            teamId
            division {
              id
              name
              abbreviation
              teams
              season
              Games {
                nextToken
              }
              level
              description
              is_playoff
              Teams {
                nextToken
              }
              createdAt
              updatedAt
            }
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      team {
        id
        name
        founded
        home_colour
        away_colour
        TeamNotes {
          items {
            id
            date
            description
            team_id
            author_id
            createdAt
            updatedAt
          }
          nextToken
        }
        team_history
        team_picture
        Divisions {
          items {
            id
            divisionId
            teamId
            division {
              id
              name
              abbreviation
              teams
              season
              Games {
                nextToken
              }
              level
              description
              is_playoff
              Teams {
                nextToken
              }
              createdAt
              updatedAt
            }
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        Players {
          items {
            id
            user_id
            soccer_stats {
              id
              teamid
              division
              position
              goals
              assists
              yellow_cards
              red_cards
              games_played
            }
            teamID
            role
            createdAt
            updatedAt
          }
          nextToken
        }
        captains
        sport
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTeamDivisions = /* GraphQL */ `
  query ListTeamDivisions(
    $filter: ModelTeamDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        divisionId
        teamId
        division {
          id
          name
          abbreviation
          teams
          season
          Games {
            items {
              id
              division
              date
              location
              status
              home_roster
              away_roster
              home_score
              away_score
              goals
              round
              referees
              HomeTeam {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              AwayTeam {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              home_color
              away_color
              createdAt
              updatedAt
              gameHomeTeamId
              gameAwayTeamId
            }
            nextToken
          }
          level
          description
          is_playoff
          Teams {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        team {
          id
          name
          founded
          home_colour
          away_colour
          TeamNotes {
            items {
              id
              date
              description
              team_id
              author_id
              createdAt
              updatedAt
            }
            nextToken
          }
          team_history
          team_picture
          Divisions {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          Players {
            items {
              id
              user_id
              soccer_stats {
                id
                teamid
                division
                position
                goals
                assists
                yellow_cards
                red_cards
                games_played
              }
              teamID
              role
              createdAt
              updatedAt
            }
            nextToken
          }
          captains
          sport
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const teamDivisionsByDivisionId = /* GraphQL */ `
  query TeamDivisionsByDivisionId(
    $divisionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTeamDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamDivisionsByDivisionId(
      divisionId: $divisionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        divisionId
        teamId
        division {
          id
          name
          abbreviation
          teams
          season
          Games {
            items {
              id
              division
              date
              location
              status
              home_roster
              away_roster
              home_score
              away_score
              goals
              round
              referees
              HomeTeam {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              AwayTeam {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              home_color
              away_color
              createdAt
              updatedAt
              gameHomeTeamId
              gameAwayTeamId
            }
            nextToken
          }
          level
          description
          is_playoff
          Teams {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        team {
          id
          name
          founded
          home_colour
          away_colour
          TeamNotes {
            items {
              id
              date
              description
              team_id
              author_id
              createdAt
              updatedAt
            }
            nextToken
          }
          team_history
          team_picture
          Divisions {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          Players {
            items {
              id
              user_id
              soccer_stats {
                id
                teamid
                division
                position
                goals
                assists
                yellow_cards
                red_cards
                games_played
              }
              teamID
              role
              createdAt
              updatedAt
            }
            nextToken
          }
          captains
          sport
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const teamDivisionsByTeamId = /* GraphQL */ `
  query TeamDivisionsByTeamId(
    $teamId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTeamDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamDivisionsByTeamId(
      teamId: $teamId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        divisionId
        teamId
        division {
          id
          name
          abbreviation
          teams
          season
          Games {
            items {
              id
              division
              date
              location
              status
              home_roster
              away_roster
              home_score
              away_score
              goals
              round
              referees
              HomeTeam {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              AwayTeam {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              home_color
              away_color
              createdAt
              updatedAt
              gameHomeTeamId
              gameAwayTeamId
            }
            nextToken
          }
          level
          description
          is_playoff
          Teams {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        team {
          id
          name
          founded
          home_colour
          away_colour
          TeamNotes {
            items {
              id
              date
              description
              team_id
              author_id
              createdAt
              updatedAt
            }
            nextToken
          }
          team_history
          team_picture
          Divisions {
            items {
              id
              divisionId
              teamId
              division {
                id
                name
                abbreviation
                teams
                season
                level
                description
                is_playoff
                createdAt
                updatedAt
              }
              team {
                id
                name
                founded
                home_colour
                away_colour
                team_history
                team_picture
                captains
                sport
                createdAt
                updatedAt
              }
              createdAt
              updatedAt
            }
            nextToken
          }
          Players {
            items {
              id
              user_id
              soccer_stats {
                id
                teamid
                division
                position
                goals
                assists
                yellow_cards
                red_cards
                games_played
              }
              teamID
              role
              createdAt
              updatedAt
            }
            nextToken
          }
          captains
          sport
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
