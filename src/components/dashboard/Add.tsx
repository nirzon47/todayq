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
import React, { useEffect, useState } from 'react'
import { AnimatePresence, progress } from 'framer-motion'
import { z } from 'zod'
import { OfferingFormType } from '@/lib/zod'
import FirstForm from './forms/FirstForm'
import { Button } from '../ui/button'

const Add = () => {
	const [category, setCategory] = useState<
		'content-distribution' | 'advertisement' | ''
	>('')

	// Offering Form State
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

	// States to show forms
	const [showOfferingForm, setShowOfferingForm] = useState<boolean>(false)
	const [showContentOfferingForm, setShowContentOfferingForm] =
		useState<boolean>(false)

	// Form Progress State
	const [formProgress, setFormProgress] = useState<0 | 1 | 2 | 3>(0)

	const handleImport = () => {
		const form = localStorage.getItem('form')
		if (form) {
			setOfferingForm(JSON.parse(form))
			setFormProgress(1)
		}
	}

	useEffect(() => {
		const formSaveInterval = setInterval(() => {
			localStorage.setItem('form', JSON.stringify(offeringForm))
		}, 10000)

		return () => {
			clearInterval(formSaveInterval)
		}
	}, [offeringForm])

	useEffect(() => {
		if (category) {
			setShowOfferingForm(true)
			setOfferingForm({ ...offeringForm, category })
		}
	}, [category, offeringForm])

	return (
		<AnimatePresence>
			<div className='grid grid-cols-1 gap-8 p-8 lg:grid-cols-8'>
				<div className='lg:col-span-2'>
					<AddSidebar progress={formProgress} />
				</div>
				<main className='lg:col-span-4'>
					<Card>
						<CardHeader>
							<CardTitle>Add Offering</CardTitle>
						</CardHeader>
						<CardContent className='grid gap-4'>
							{formProgress === 0 && (
								<div className='grid gap-2'>
									<Label>Select Category</Label>
									<Select onValueChange={setCategory as any}>
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
							{showOfferingForm && (
								<FirstForm
									key='first-form'
									offeringForm={offeringForm}
									setOfferingForm={setOfferingForm}
									setShowOfferingForm={setShowOfferingForm}
									setFormProgress={setFormProgress}
									setShowContentOfferingForm={setShowContentOfferingForm}
								/>
							)}
							{formProgress === 1 && <div>test</div>}
						</CardContent>
					</Card>
				</main>
				<div className='lg:col-span-2'>
					{offeringForm.category && (
						<Card>
							<CardHeader>
								<CardTitle>Previous Form</CardTitle>
							</CardHeader>
							<CardContent>
								<div>{offeringForm.category}</div>
								<Button onClick={handleImport}>Import</Button>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</AnimatePresence>
	)
}

export default Add
