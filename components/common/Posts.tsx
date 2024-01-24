// import { Fragment, useState } from "react"
// import { Dialog, Transition } from "@headlessui/react"
import { Icon } from "@iconify/react"
import parse from "html-react-parser"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { Byline } from "@/components/common/Byline"
import { BlogType, PaginationType, PostType } from "@/types/blog"

type Props = {
  posts: PostType[]
  blog?: BlogType
  pagination: PaginationType
}

export const Posts: React.FunctionComponent<Props> = ({
  posts,
  blog,
  pagination,
}) => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const { locale: activeLocale } = router

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="space-t-10 lg:space-t-10 mt-4 lg:mt-6">
            {posts.map((post) => (
              <article
                key={post.doi || post.url}
                className="relative mb-5 gap-6"
              >
                <div>
                  {post.tags && (
                    <div className="flex items-center gap-x-1 text-xs">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="relative z-10 ml-0 rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-800 dark:bg-blue-700 dark:text-blue-200"
                        >
                          <Link
                            href={`${pagination.base_url}?page=${pagination.page}&query=${pagination.query}&tags=${tag}`}
                            className="whitespace-no-wrap"
                          >
                            {tag}
                          </Link>
                        </span>
                      ))}
                      {post.category && (
                        <span className="relative z-10 ml-0 rounded-full bg-teal-100 px-2 py-0.5 font-medium text-teal-800 dark:bg-teal-700 dark:text-teal-200">
                          <Link
                            href={`${pagination.base_url}?page=${pagination.page}&query=${pagination.query}&category=${post.category}`}
                            className="whitespace-no-wrap"
                          >
                            {t("categories." + post.category)}
                          </Link>
                        </span>
                      )}
                      {post.language !== activeLocale && (
                        <span className="relative z-10 ml-0 rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-800 dark:bg-green-700 dark:text-green-200">
                          {t("languages." + post.language)}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="group relative max-w-4xl">
                    {post.doi && (
                      <>
                        <Link
                          className="text-base hover:dark:text-gray-200"
                          target="_blank"
                          href={post.doi}
                        >
                          <h3
                            className="mt-1 text-xl font-semibold text-gray-900 hover:text-gray-500 dark:text-gray-100"
                            data-cy="title"
                          >
                            {parse(String(post.title))}
                          </h3>
                        </Link>
                        <div className="py-1 font-medium">
                          <Link
                            className="text-base text-gray-500 hover:text-gray-900 hover:dark:text-gray-200"
                            target="_blank"
                            href={post.doi}
                          >
                            <Icon
                              icon="academicons:doi"
                              className="mb-1 mr-1 inline text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                            />
                            {post.doi}
                          </Link>
                        </div>
                      </>
                    )}
                    {!post.doi && post.url && (
                      <Link
                        className="text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        target="_blank"
                        href={post.url}
                      >
                        <h3 className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {parse(String(post.title))}
                        </h3>
                      </Link>
                    )}
                  </div>
                  <Byline post={post} blog={blog} />
                  {post.doi && (
                    <div className="py-1 font-medium">
                      <Link
                        className="mr-5 text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          `/posts/${post.doi.substring(16)}.md`
                        }
                      >
                        <Icon
                          icon="fa6-brands:markdown"
                          className="mb-1 mr-1 inline text-sm"
                        />
                        Markdown
                      </Link>
                      <Link
                        className="mr-5 text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          `/posts/${post.doi.substring(16)}.epub`
                        }
                      >
                        <Icon
                          icon="fa6-solid:file-arrow-down"
                          className="mb-1 mr-1 inline text-sm"
                        />
                        ePub
                      </Link>
                      <Link
                        className="mr-5 text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          `/posts/${post.doi.substring(16)}.pdf`
                        }
                      >
                        <Icon
                          icon="fa6-solid:file-pdf"
                          className="mb-1 mr-1 inline text-sm"
                        />
                        PDF
                      </Link>
                      <Link
                        className="mr-5 text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          `/posts/${post.doi.substring(16)}.xml`
                        }
                      >
                        <Icon
                          icon="tabler:file-type-xml"
                          className="mb-1 mr-1 inline text-sm"
                        />
                        JATS XML
                      </Link>
                      <Link
                        className="text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          `/posts/${post.doi.substring(16)}?format=csl`
                        }
                      >
                        <Icon
                          icon="bxs:file-json"
                          className="mb-1 mr-1 inline text-sm"
                        />
                        CSL JSON
                      </Link>
                      <Link
                        className="text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          `/posts/${post.doi.substring(16)}.jsonld`
                        }
                      >
                        <Icon
                          icon="file-icons:json-ld1"
                          className="mb-1 ml-5 mr-1 inline text-sm"
                        />
                        Schema.org
                      </Link>
                      <Link
                        className="text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          `/posts/${post.doi.substring(16)}.bib`
                        }
                      >
                        <Icon
                          icon="fa6-solid:file-code"
                          className="mb-1 ml-5 mr-1 inline text-sm"
                        />
                        BibTex
                      </Link>
                      <Link
                        className="text-base text-gray-300 hover:text-gray-900 hover:dark:text-gray-200"
                        href={
                          process.env.NEXT_PUBLIC_API_URL +
                          `/posts/${post.doi.substring(
                            16
                          )}?format=citation&style=apa&locale=${activeLocale}`
                        }
                      >
                        <Icon
                          icon="fa6-solid:file-lines"
                          className="mb-1 ml-5 mr-1 inline text-sm"
                        />
                        Citation (APA)
                      </Link>
                    </div>
                  )}
                  <div className="max-w-2xl py-2 md:flex lg:max-w-4xl">
                    {post.image && (
                      <div className="relative mr-4 h-48 w-64 shrink-0">
                        <Image
                          src={post.image}
                          alt=""
                          fill={true}
                          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 md:object-cover"
                        />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    )}
                    {post.summary && (
                      <p className="text-medium max-w-screen-sm font-serif leading-6 text-gray-900 dark:text-white">
                        {parse(String(post.summary))}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}