'use client'

import AddSidebar from '@/components/dashboard/AddSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { ContentOfferingFormType, OfferingFormType } from '@/lib/zod'
import FirstForm from './forms/FirstForm'
import SecondForm from './forms/SecondForm'
import ReviewForm from './forms/ReviewForm'

const Add = () => {
	// Category States
	const [category, setCategory] = useState<
		'content-distribution' | 'advertisement' | ''
	>('')
	const [offeringCategory, setOfferingCategory] = useState<
		| 'press-release'
		| 'sponsored'
		| 'sponsored-with-aggregators'
		| 'newsletter'
		| 'social-media'
		| 'review-article'
		| ''
	>('')

	// Form State
	const [offeringForm, setOfferingForm] = useState<
		z.infer<typeof OfferingFormType>
	>({
		category: '',
		name: '',
		url: '',
		desc: '',
		email: '',
		telegram: '',
		gambling: false,
		adult: false,
		web3: false,
	})
	const [contentOfferingForm, setContentOfferingForm] = useState<
		z.infer<typeof ContentOfferingFormType>
	>({
		category: '',
		price: 0,
		discountedPrice: 0,
		features: [],
	})

	// Form Progress State
	const [formProgress, setFormProgress] = useState<0 | 1 | 2 | 3>(0)

	return (
		<AnimatePresence>
			<div className='grid grid-cols-1 gap-8 p-8 lg:h-[calc(100vh-64px)] lg:grid-cols-8 lg:overflow-hidden'>
				<div className='lg:col-span-2'>
					<AddSidebar progress={formProgress} />
				</div>
				<main className='scrollbar-hide lg:col-span-4 lg:overflow-scroll'>
					<Card>
						<CardHeader>
							<CardTitle>
								{formProgress === 0
									? 'Add Offering'
									: formProgress === 1
										? 'Add Content Offerings'
										: 'Review'}
							</CardTitle>
						</CardHeader>
						<CardContent className='grid gap-4'>
							{formProgress === 0 && (
								<div className='grid gap-2'>
									<Label>Select Category</Label>
									<Select
										onValueChange={setCategory as any}
										value={category === '' ? offeringForm.category : category}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select a category' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='content-distribution'>
												Content Distribution
											</SelectItem>
											<SelectItem value='advertisement'>
												Advertisement
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							)}
							{formProgress === 0 && (offeringForm.category || category) && (
								<FirstForm
									key='first-form'
									offeringForm={offeringForm}
									setOfferingForm={setOfferingForm}
									setFormProgress={setFormProgress}
									category={category}
									setCategory={setCategory}
								/>
							)}
							{formProgress === 1 && (
								<div className='grid gap-2'>
									<Label>Select Offering</Label>
									<Select
										onValueChange={setOfferingCategory as any}
										value={
											offeringCategory === ''
												? contentOfferingForm.category
												: offeringCategory
										}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select a category' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='press-release'>
												Press Release
											</SelectItem>
											<SelectItem value='sponsored'>Sponsored</SelectItem>
											<SelectItem value='sponsored-with-aggregators'>
												Sponsored with Aggregators
											</SelectItem>
											<SelectItem value='newsletter'>Newsletter</SelectItem>
											<SelectItem value='social-media'>Social Media</SelectItem>
											<SelectItem value='review-article'>
												Review Article
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							)}
							{formProgress === 1 &&
								(contentOfferingForm.category || offeringCategory) && (
									<SecondForm
										key='second-form'
										contentOfferingForm={contentOfferingForm}
										setContentOfferingForm={setContentOfferingForm}
										setFormProgress={setFormProgress}
										offeringCategory={offeringCategory}
										setOfferingCategory={setOfferingCategory}
									/>
								)}
							{formProgress === 2 && (
								<ReviewForm
									key='review-form'
									offeringForm={offeringForm}
									contentOfferingForm={contentOfferingForm}
									setFormProgress={setFormProgress}
								/>
							)}
						</CardContent>
					</Card>
				</main>
				<div className='lg:col-span-2'></div>
			</div>
		</AnimatePresence>
	)
}

export default Add
