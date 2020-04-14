import Head from 'next/head';
import About from '../content/about.mdx';
import dynamic from 'next/dynamic';

const P5Wrapper = dynamic(() => import('react-p5-wrapper'), { ssr: false });

const apiKey = '1260dffeb918a79946fbbd0a820093a3';
const norwichWeather = `https://api.openweathermap.org/data/2.5/weather?q=norwich,uk&appid=${apiKey}`;

const sketch = p => {
  let size = 0;
  let bgColor = p.color(255, 255, 255);

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0, 0);
    canvas.style('position', 'fixed');
    canvas.style('z-index', '-1');
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.weatherData) {
      const red = p.map(props.weatherData.main.temp, 270, 310, 255, 0)
      bgColor = p.color(red, 0, 0);
    }
  }

  p.draw = () => {
    p.background(bgColor);
    p.ellipse(50, 50, size, size);
    size += 1;
    if (size > 99) {
      size = 0;
    }
  };
};

const Home = () => {
  const [weatherData, setWeatherData]  = React.useState();

  React.useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(norwichWeather)
      const data = await response.json()
      setWeatherData(data);
    }

    fetchWeather();
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Untangled</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">Untangled</h1>
        <P5Wrapper sketch={sketch} weatherData={weatherData} />
        <About />
      </main>
      <footer>
        <a
          href="https://www.neontribe.co.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by Neontribe
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
