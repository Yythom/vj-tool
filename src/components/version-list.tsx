import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchVersions, Version } from '../services/api'
import { setCookie } from '../utils/chrome'

export const VersionList: React.FC = () => {
  const { data, refetch } = useQuery({
    queryKey: ['versions'],
    queryFn: fetchVersions,
    initialData: JSON.parse(
      localStorage.getItem('versions') || '[]',
    ) as Version[],
    staleTime: 0,
    refetchOnMount: true,
  })

  const handleVersionChange = async (versionName: string) => {
    setCookie('feature', versionName)
    refetch()
  }

  return data?.map((version) => (
    <li
      key={version.name}
      className="flex items-center text-sm hover:opacity-70"
    >
      <input
        type="radio"
        id={version.name}
        name="version"
        value={version.name}
        checked={version.selected}
        onChange={() => handleVersionChange(version.name)}
        className="mr-2"
      />
      <label htmlFor={version.name} className="cursor-pointer">
        {version.name}
      </label>
    </li>
  ))
}
