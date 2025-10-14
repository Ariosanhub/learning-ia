import { test, expect } from '@playwright/test';

test.describe('Workspace Experience', () => {
  test('navega entre módulos de trabalho e OKRs', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Sprint Atual · Squad Growth')).toBeVisible();
    await page.getByRole('button', { name: 'Metas & OKRs' }).click();
    await expect(page.getByText('OKRs Q2 · Progresso em tempo real')).toBeVisible();
  });

  test('visualiza feed de feedbacks e elogios', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Pessoas & Feedbacks' }).click();
    await expect(page.getByText('Feedbacks & Elogios · Semana Atual')).toBeVisible();
    await expect(page.getByText('Patrícia Souza')).toBeVisible();
  });

  test('aciona CTA de automação', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Metas & OKRs' }).click();
    await expect(page.getByRole('button', { name: 'Gerar pauta de 1:1 com IA' })).toBeVisible();
  });
});
