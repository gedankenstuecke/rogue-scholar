import { Container } from '../components/Container'
import DonutChart from './DonutChart'

// tailwindcss colors
export const blue = {
  'blue-100': '#dbeafe',
  'blue-200': '#bfdbfe',
  'blue-300': '#93c5fd',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',
  'blue-800': '#1e40af',
  'blue-900': '#1e3a8a',
}

export const range = Object.values(blue)

export const languageRange = Object.values(blue).filter(function (_v, i) {
  return i % 5 == 0
})

export const languageDomain = ['English', 'Deutsch']

export const categoryDomain = [
  'Natural Sciences',
  'Engineering and Technology',
  'Medical and Health Sciences',
  'Social Sciences',
  'Humanities',
]

export const platformDomain = [
  'Wordpress',
  'Ghost',
  'Blogger',
  'Medium',
  'Hugo',
  'Jekyll',
  'Unknown',
]

type Data = {
  title: string
  count: number
}

type Props = {
  count: number
  categories: Data[]
  languages: Data[]
  platforms: Data[]
}

export const Stats: React.FunctionComponent<Props> = ({
  count,
  categories,
  languages,
  platforms,
}) => {
  return (
    <section
      id="stats"
      aria-labelledby="stats-title"
      className="relative overflow-hidden py-5 sm:py-10"
    >
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-blue-600 sm:text-4xl"
          >
            Statistics
          </h2>
          <p className="mt-2 text-lg tracking-tight text-slate-700">
            Fundamental numbers describing the included blogs.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          <li key="category">
            <ul role="list" className="flex flex-col gap-y-8">
              <DonutChart
                data={categories}
                legend={false}
                count={count}
                title="Category"
                range={range}
                domain={categoryDomain}
              ></DonutChart>
            </ul>
          </li>
          <li key="language">
            <ul role="list" className="flex flex-col gap-y-8">
              <DonutChart
                data={languages}
                legend={false}
                count={count}
                title="Language"
                range={languageRange}
                domain={languageDomain}
              ></DonutChart>
            </ul>
          </li>
          <li key="language">
            <ul role="list" className="flex flex-col gap-y-8">
              <DonutChart
                data={platforms}
                legend={false}
                count={count}
                title="Platform"
                range={range}
                domain={platformDomain}
              ></DonutChart>
            </ul>
          </li>
        </ul>
      </Container>
    </section>
  )
}