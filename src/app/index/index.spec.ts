import { server } from '../../common/configurations/server.setup';
import supertest from 'supertest';
import axios, { AxiosStatic } from 'axios';

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}
jest.mock('axios');
const mockAxios = axios as AxiosMock;

describe('Github popular repositories:', () => {
  const app = server();

  jest.mock(
    '../../core/middlewares/validate-repository-request.middlware.ts',
    () => jest.fn((req, res, next) => next())
  );
  describe('should have been called with', () => {
    const result = {
      data: {
        total_count: 11102792,
        incomplete_results: true,
        items: [
          {
            id: 170326929,
            node_id: 'MDEwOlJlcG9zaXRvcnkxNzAzMjY5Mjk=',
            name: 'Awesome-Design-Tools',
            full_name: 'goabstract/Awesome-Design-Tools',
            private: false,
            owner: {
              login: 'goabstract',
              id: 18014107,
              node_id: 'MDEyOk9yZ2FuaXphdGlvbjE4MDE0MTA3',
              avatar_url:
                'https://avatars.githubusercontent.com/u/18014107?v=4',
              gravatar_id: '',
              url: 'https://api.github.com/users/goabstract',
              html_url: 'https://github.com/goabstract',
              followers_url:
                'https://api.github.com/users/goabstract/followers',
              following_url:
                'https://api.github.com/users/goabstract/following{/other_user}',
              gists_url:
                'https://api.github.com/users/goabstract/gists{/gist_id}',
              starred_url:
                'https://api.github.com/users/goabstract/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/goabstract/subscriptions',
              organizations_url: 'https://api.github.com/users/goabstract/orgs',
              repos_url: 'https://api.github.com/users/goabstract/repos',
              events_url:
                'https://api.github.com/users/goabstract/events{/privacy}',
              received_events_url:
                'https://api.github.com/users/goabstract/received_events',
              type: 'Organization',
              site_admin: false,
            },
            html_url: 'https://github.com/goabstract/Awesome-Design-Tools',
            description: 'The best design tools and plugins for everything 👉',
          },
        ],
      },
      statusCode: 200,
    };
    it('should create short url ', async () => {
      const url =
        '/?startingDate=2019-01-10&dateComparison=greater&languages=react,javascript&order=desc&limit=50&page=1';
      mockAxios.mockResolvedValue(result);
      const response = await supertest(app).get(url);
      expect(mockAxios.get).toHaveBeenCalledWith(
        process.env.DOMAIN_NAME +
          'search/repositories?q=created:>2019-01-10+language:react+language:javascript&sort=stars&order=desc&per_page=50&page=1'
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
