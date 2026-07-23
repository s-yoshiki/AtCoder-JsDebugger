import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { SettingRow } from '@/components/ui/setting-row';
import {
  StatusMessage,
  useTransientStatus,
} from '@/components/ui/status-message';
import { Switch } from '@/components/ui/switch';
import { useStore } from '@/hooks/use-store';
import { useI18n } from '@/i18n/context';
import {
  ALL_STORES,
  type EditorSettings,
  editorSettingsStore,
} from '@/lib/settings';
import { resetAllStores } from '@/lib/storage';

const fontSizeOptions = ['12', '13', '14', '16', '18'];
const timeoutSeconds = [2, 5, 10, 30];

export function EditorSettingsPage() {
  const { t } = useI18n();
  const [settings, setSettings] = useStore(editorSettingsStore);
  const [status, setStatus] = useTransientStatus();

  const rows = t.settings.rows;

  const update = <K extends keyof EditorSettings>(
    key: K,
    value: EditorSettings[K],
  ) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
    setStatus({ tone: 'success', text: t.settings.saved });
  };

  const clearAll = () => {
    if (!window.confirm(t.settings.confirmClear)) {
      return;
    }
    resetAllStores(ALL_STORES);
    setStatus({ tone: 'success', text: t.settings.cleared });
  };

  const themeOptions = [
    { value: 'auto', label: t.settings.themeOptions.auto },
    { value: 'light', label: t.settings.themeOptions.light },
    { value: 'dark', label: t.settings.themeOptions.dark },
    { value: 'high-contrast', label: t.settings.themeOptions.hc },
  ];

  const paneSizeOptions = [
    { value: '150', label: t.settings.paneSizeOptions.small },
    { value: '200', label: t.settings.paneSizeOptions.default },
    { value: '250', label: t.settings.paneSizeOptions.large },
    { value: '320', label: t.settings.paneSizeOptions.xlarge },
  ];

  return (
    <div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {t.settings.intro}
      </p>

      <div className="mt-4">
        <SettingRow
          title={rows.stderr.title}
          description={rows.stderr.description}
          control={
            <Switch
              checked={settings.showStderr}
              onCheckedChange={(value) => update('showStderr', value)}
              aria-label={rows.stderr.title}
            />
          }
        />

        <SettingRow
          title={rows.cache.title}
          description={rows.cache.description}
          control={
            <Switch
              checked={settings.restoreCache}
              onCheckedChange={(value) => update('restoreCache', value)}
              aria-label={rows.cache.title}
            />
          }
        />

        <SettingRow
          title={rows.theme.title}
          description={rows.theme.description}
          controlClassName="w-56"
          control={
            <Select
              value={settings.theme}
              onChange={(event) =>
                update('theme', event.target.value as EditorSettings['theme'])
              }
              aria-label={rows.theme.title}
            >
              {themeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          }
        />

        <SettingRow
          title={rows.fontSize.title}
          description={rows.fontSize.description}
          controlClassName="w-32"
          control={
            <Select
              value={String(settings.fontSize)}
              onChange={(event) =>
                update('fontSize', Number(event.target.value))
              }
              aria-label={rows.fontSize.title}
            >
              {fontSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} px
                </option>
              ))}
            </Select>
          }
        />

        <SettingRow
          title={rows.wordWrap.title}
          description={rows.wordWrap.description}
          control={
            <Switch
              checked={settings.wordWrap}
              onCheckedChange={(value) => update('wordWrap', value)}
              aria-label={rows.wordWrap.title}
            />
          }
        />

        <SettingRow
          title={rows.minimap.title}
          description={rows.minimap.description}
          control={
            <Switch
              checked={settings.minimap}
              onCheckedChange={(value) => update('minimap', value)}
              aria-label={rows.minimap.title}
            />
          }
        />

        <SettingRow
          title={rows.paneSize.title}
          description={rows.paneSize.description}
          controlClassName="w-56"
          control={
            <Select
              value={String(settings.paneSize)}
              onChange={(event) =>
                update('paneSize', Number(event.target.value))
              }
              aria-label={rows.paneSize.title}
            >
              {paneSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          }
        />

        <SettingRow
          title={rows.timeout.title}
          description={rows.timeout.description}
          controlClassName="w-40"
          control={
            <Select
              value={String(settings.timeoutMs)}
              onChange={(event) =>
                update('timeoutMs', Number(event.target.value))
              }
              aria-label={rows.timeout.title}
            >
              {timeoutSeconds.map((seconds) => (
                <option key={seconds} value={seconds * 1000}>
                  {t.settings.timeoutOptions(seconds)}
                </option>
              ))}
            </Select>
          }
        />

        <SettingRow
          title={rows.reset.title}
          description={rows.reset.description}
          control={
            <Button variant="destructive" size="sm" onClick={clearAll}>
              <Trash2 className="size-3.5" />
              {t.settings.rows.reset.title}
            </Button>
          }
        />
      </div>

      <StatusMessage status={status} className="mt-5" />
    </div>
  );
}
