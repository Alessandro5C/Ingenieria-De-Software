import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18next/i18n.constants';
import LanguageIcon from '@mui/icons-material/Language';

interface Language {
  id: string,
  name: string
}

const languages: Language[] = [
  {
    id: 'en',
    name: 'English'
  },
  {
    id: 'es',
    name: 'Español'
  }
]

export default function LangSelector() {
  const { i18n } = useTranslation(namespaces.pages.signin);
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }

  return (
    <>
      {
        languages.map(lng => (
          <ListItemButton key={lng.id} disabled= {i18n.resolvedLanguage === lng.id} onClick={() => i18n.changeLanguage(lng.id)}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={lng.name} />
          </ListItemButton>
        ))
      }
    </>
  )
}
