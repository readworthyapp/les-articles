#!/usr/bin/env node
import path from 'path'
import chalk from 'chalk'
import { Database } from './db.model'
import { generateSlug, getDomainFromUrl } from './helpers'

const originalUrl = process.argv[2]
const tags: string[] = Array.isArray(process.argv[3]) ? process.argv[3] : []

if (!originalUrl) {
    console.error(`${chalk.red('✗')} Please provide a URL.`)
    process.exit(1)
}

const slug = generateSlug(originalUrl)
const dbPath = path.join(__dirname, '../db.json')
const domain = getDomainFromUrl(originalUrl)

new Database(dbPath).appendArticle({
    createdAt: new Date().toISOString(),
    domain,
    originalUrl,
    slug,
    tags,
    updatedAt: new Date().toISOString(),
    path: `articles/${domain}/${slug}.html`,
})

console.log(`${chalk.green('✓')} Added ${chalk.cyan(originalUrl)} to the database.`)
